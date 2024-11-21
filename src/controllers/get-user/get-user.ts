import type { User } from "../../models/user";
import type { HttpRequest, HttpResponse, IController } from "../protocols";
import { internalServerError, ok } from "../utils/utils";
import { IGetUserRepository, type GetUserParams } from "./protocols";

export class GetUserController implements IController {
  constructor(private readonly getUserRepository: IGetUserRepository) {}

  async handle(reqParams: HttpRequest<GetUserParams>): Promise<HttpResponse<User | string>> {
    try {
      const id = reqParams.params?.id;

      const user = await this.getUserRepository.getUser(id!);

      return ok<User>(user);
    } catch (err: unknown) {
      console.log(err);

      return internalServerError();
    }
  }
}
