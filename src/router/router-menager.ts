import http from "node:http";
import Router from "./router";
import { buildRequestObj } from "./buildRequest";
import { RouterMethods } from "../@types/router-methods";

interface Response extends http.ServerResponse<http.IncomingMessage> {}

export default async (req: http.IncomingMessage, res: Response) => {
  const routes = Router.getRoutes();
  const requestObj = await buildRequestObj(req);
  const method = requestObj.method;
  const mayRoute = routes.filter(
    (route) =>
      RouterMethods[route.method]!.toLowerCase() === method!.toLowerCase() &&
      requestObj.path
  );
  if (mayRoute.length === 0) responseHandle(res, 404, "Not Found");
  mayRoute[0].middleware.forEach(async (e) => {
    await e(req, res);
  });
  const response = (await mayRoute[0].endpoint(
    req,
    res
  )) as unknown as Response;
  responseHandle(response, 200, "OK");
};

function responseHandle(res: Response, statusCode: string | number, data: any) {
  res.writeHead(Number(statusCode), { "Content-type": "application/json" });
  res.end(data);
}
