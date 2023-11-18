import http from "http";

const PORT = 3000;

const server = http.createServer();

server.on("request", async (req, res) => {
  const method = req.method;
  const body = await getBody(req);
  const url = req.url ?? "";
  const [first, ...rest] = url?.split("?");
  const queryString = rest.reduce((acc, item) => (acc += item), "");
  const query: any = {};
  queryString.split("&").forEach((v) => {
    let [key, value] = v.split("=");
    query[key] = value;
  }),
    console.log(query);
  console.log(url);
  const headers = req.headers;
  res.writeHead(200, { "Content-type": "application/json" });
  res.end();
});

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

server.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});
