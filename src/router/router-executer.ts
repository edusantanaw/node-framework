import http from "http";

export function routerExecuter(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  }
) {}

export async function buildRequestObj(req: http.IncomingMessage) {
  const method = req.method;
  const body = await getBody(req);
  const url = req.url ?? "";
  const query = getQuery(url);
  return {
    ...req,
    method,
    body,
    query,
  };
}

function getBody(req: http.IncomingMessage) {
  let data = "";
  return new Promise((resolve, reject) => {
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      resolve(JSON.parse(data));
    });
  });
}

function getQuery(url: string) {
  const [_, ...rest] = url?.split("?");
  const queryString = rest.reduce((acc, item) => (acc += item), "");
  const query: any = {};
  queryString.split("&").forEach((v) => {
    let [key, value] = v.split("=");
    query[key] = value;
  });
}
