import http from "node:http";
import Router from "./router";
import { buildRequestObj } from "./buildRequest";
import { RouterMethods } from "../@types/router-methods";
import { Response } from "../@types/Response";
import { HttpResponse } from "../http/Response";

export default async (req: http.IncomingMessage, res: Response) => {
  const routes = Router.getRoutes();
  const requestObj = await buildRequestObj(req);
  const method = requestObj.method;
  const mayRoute = routes.filter(
    (route) =>
      RouterMethods[route.method]!.toLowerCase() === method!.toLowerCase() &&
      requestObj.path
  );
  const httpResponse = new HttpResponse();
  if (mayRoute.length === 0) responseHandle(httpResponse, res);
  console.log(mayRoute[0]);
  const response = (await mayRoute[0].handles.executeAll(
    requestObj,
    httpResponse
  )) as any;
  responseHandle(httpResponse, res);
};

function responseHandle(httpResponse: HttpResponse, res: Response) {
  res.writeHead(httpResponse.statusCode, { "Content-type": "application/json" });
  res.end(httpResponse.data);
}
