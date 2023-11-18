import http from "http";
import routerMenager from "./router/router-menager";
import router from "./router/router";

const PORT = 3000;

const server = http.createServer();

router.get("/ola", (req, res) => {
  return res;
});

server.on("request", async (req, res) => {
  await routerMenager(req, res);
});

server.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});
