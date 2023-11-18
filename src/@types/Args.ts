import { HttpRequest } from "../http/Request";
import { HttpResponse } from "../http/Response";

export type Args = (
  req: HttpRequest,
  res: HttpResponse,
  next?: () => Promise<HttpResponse> | HttpResponse
) => Promise<HttpResponse> | HttpResponse;
