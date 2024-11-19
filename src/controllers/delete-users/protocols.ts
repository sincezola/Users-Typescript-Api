import type { User } from "../../models/user";
import type { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteUserController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
