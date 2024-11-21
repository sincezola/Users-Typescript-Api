import type { GetUserParams } from "./get-user/protocols";

export interface HttpResponse<T> {
  statusCode: httpStatusCode;
  body: T;
}

export interface HttpRequest<B> {
  params?: GetUserParams;
  headers?: Record<string, string>;
  body?: B;
}

export enum httpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
  NO_CONTENT = 204,
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
