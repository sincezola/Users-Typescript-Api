import type { User } from "../../models/user";
import type { HttpRequest, HttpResponse } from "../protocols";
import type {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      // Verifica se o corpo da requisição foi enviado
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify a body",
        };
      }

      // Cria o usuário usando o repositório
      const user = await this.createUserRepository.createUser(httpRequest.body);

      // Retorna a resposta de sucesso
      return {
        statusCode: 201,
        body: user,
      };
    } catch (err) {
      // Retorna erro interno do servidor
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
