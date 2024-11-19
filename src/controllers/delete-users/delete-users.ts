import type { User } from "../../models/user";
import type { HttpRequest, HttpResponse, IController } from "../protocols";
import {
  badRequest,
  internalServerError,
  noContentToResponse,
} from "../utils/utils";
import type { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<User | string | null>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing user id");
      }

      await this.deleteUserRepository.deleteUser(id);

      return noContentToResponse();
    } catch (err: unknown) {
      console.log(err);

      return internalServerError();
    }
  }
}
