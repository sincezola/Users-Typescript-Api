import type { HttpResponse } from "../protocols";

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: 400,
    body: message,
  };
};

export const ok = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: 200,
    body: body,
  };
};

export const created = <T>(body: any): HttpResponse<T> => {
  return {
    statusCode: 201,
    body: body,
  };
};

export const internalServerError = (): HttpResponse<string> => {
  return {
    statusCode: 500,
    body: "Something went wrong.",
  };
};

export const noContentToResponse = (): HttpResponse<null> => ({
  statusCode: 204,
  body: null,
});
