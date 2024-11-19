import validator from "validator";
import type { User } from "../../models/user";
import type { HttpRequest, HttpResponse, IController } from "../protocols";
import type { CreateUserParams, ICreateUserRepository } from "./protocols";
import { badRequest, created, internalServerError } from "../utils/utils";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      if (!httpRequest?.body) {
        return badRequest("Request body is required");
      }

      const requiredFields: (keyof CreateUserParams)[] = [
        "firstName",
        "lastName",
        "email",
        "password",
      ];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("E-mail is invalid");
      }

      const user = await this.createUserRepository.createUser(httpRequest.body);

      return created<User>(user);
    } catch (err: unknown) {
      console.log(err);

      return internalServerError();
    }
  }
}
