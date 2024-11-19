import { User } from "../../models/user";
import { HttpRequest, HttpResponse, type IController } from "../protocols";
import { badRequest, internalServerError, ok } from "../utils/utils";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";
export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        badRequest("Missing fields.")
      }

      if (!id) {
        return badRequest("Missing user id");
      }
      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body!).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }
      const user = await this.updateUserRepository.updateUser(id, body!);
      return ok(user)
    } catch (err: unknown) {
      console.log(err);

      return internalServerError();
    }
  }
}
