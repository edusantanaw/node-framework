import http from "http";
import routerMenager from "./router/router-menager";
import router from "./router/router";
import { HttpResponse } from "./http/Response";

const PORT = 3000;

const server = http.createServer();

router.post("/ola", (req, res: HttpResponse)=> {
  console.log(req.body);
  return res.status(201).json(req.body)
})

server.on("request", async (req, res) => {
  await routerMenager(req, res);
});

server.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});
