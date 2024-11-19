import { httpStatusCode, type HttpResponse } from "../protocols";

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: httpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const ok = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: httpStatusCode.OK,
    body: body,
  };
};

export const created = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: httpStatusCode.CREATED,
    body: body,
  };
};

export const internalServerError = (): HttpResponse<string> => {
  return {
    statusCode: httpStatusCode.SERVER_ERROR,
    body: "Something went wrong.",
  };
};

export const noContentToResponse = (): HttpResponse<null> => ({
  statusCode: httpStatusCode.NO_CONTENT,
  body: null,
});
