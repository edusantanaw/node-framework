import { IncomingMessage } from "node:http";

interface ParsedRequest {
  method: string;
  body: any;
  query: { [key: string]: string };
  path: string;
  req: IncomingMessage;
}

export class BuildHttpRequest {
  constructor(protected req: IncomingMessage) {}

  async build() {
    const request = await this.getRequest();
    return new HttpRequest(request);
  }

  private getBody(req: IncomingMessage) {
    let data = "";
    return new Promise((resolve) => {
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        resolve(JSON.parse(data));
      });
    });
  }

  private getQuery(url: string) {
    const [path, ...rest] = url?.split("?");
    const queryString = rest.reduce((acc, item) => (acc += item), "");
    const query: any = {};
    queryString.split("&").forEach((v) => {
      let [key, value] = v.split("=");
      query[key] = value;
    });
    return [path, query];
  }

  public async getRequest(): Promise<ParsedRequest> {
    const method = this.req.method;
    const body = await this.getBody(this.req);
    const [path, query] = this.getQuery(this.req.url ?? "");
    return {
      req: this.req,
      method: method!,
      body,
      query,
      path,
    };
  }
}

export class HttpRequest extends IncomingMessage {
  body: any;
  query: { [key: string]: string };
  path: string;
  req: IncomingMessage
  override method: string;
  constructor(protected request: ParsedRequest) {
    super(request.req.socket);
    this.body = request.body;
    this.query = request.query;
    this.path = request.path;
    this.method = request.method;
    this.req = request.req
  }
}
