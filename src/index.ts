import http from "http";
import routerMenager from "./router/router-menager";
import { HttpResponse } from "./http/Response";
import Router from "./dataStructs/Router";

const PORT = 3000;

const server = http.createServer();

Router.post("/ola", (req, res: HttpResponse)=> {
  console.log(req.body);
  return res.status(201).json(req.body)
})

server.on("request", async (req, res) => {
  await routerMenager(req, res);
});

server.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});
