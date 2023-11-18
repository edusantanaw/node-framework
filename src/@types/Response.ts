import http from "http"

export interface Response extends http.ServerResponse<http.IncomingMessage> {}