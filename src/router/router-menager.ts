import http from "node:http";
import { Response } from "../@types/Response";
import Router from "../dataStructs/Router";
import { RouterMethods } from "../enums/router-methods";
import { BuildHttpRequest } from "../http/Request";
import { HttpResponse } from "../http/Response";

export default async (req: http.IncomingMessage, res: Response) => {
  const httpResponse = new HttpResponse();
  const httpRequest = await new BuildHttpRequest(req).build();
  const routes = Router.getRoutes();
  const method = httpRequest.method;
  const mayRoute = routes.filter(
    (route) =>
      RouterMethods[route.method]!.toLowerCase() === method!.toLowerCase() &&
      httpRequest.path
  );

  if (mayRoute.length === 0) responseHandle(httpResponse, res);
  await mayRoute[0].handles.executeAll(httpRequest, httpResponse);
  responseHandle(httpResponse, res);
};

function responseHandle(httpResponse: HttpResponse, res: Response) {
  res.writeHead(httpResponse.statusCode, {
    "Content-type": "application/json",
  });
  res.end(httpResponse.data);
}
