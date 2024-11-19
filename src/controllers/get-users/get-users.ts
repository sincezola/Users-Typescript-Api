import type { User } from "../../models/user";
import type { HttpResponse, IController } from "../protocols";
import { internalServerError, ok } from "../utils/utils";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok<User[]>(users);
    } catch (err: unknown) {
      console.log(err);

      return internalServerError();
    }
  }
}
