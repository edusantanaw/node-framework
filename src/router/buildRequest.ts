import http from "http";

export async function buildRequestObj(req: http.IncomingMessage) {
  const method = req.method;
  const body = await getBody(req);
  const [path, query] = getQuery(req.url ?? "");
  return {
    ...req,
    method,
    body,
    query,
    path,
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
  const [path, ...rest] = url?.split("?");
  const queryString = rest.reduce((acc, item) => (acc += item), "");
  const query: any = {};
  queryString.split("&").forEach((v) => {
    let [key, value] = v.split("=");
    query[key] = value;
  });
  return [path, query];
}
