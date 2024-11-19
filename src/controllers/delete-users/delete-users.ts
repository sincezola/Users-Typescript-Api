import type { User } from "../../models/user";
import type { HttpRequest, HttpResponse, IController } from "../protocols";
import type { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return {
        statusCode: 204,
        body: user,
      };
    } catch (err) {
      console.log(err);

      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
