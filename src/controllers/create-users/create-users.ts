import validator from "validator";
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
      if (!httpRequest?.body) {
        return {
          statusCode: 400,
          body: "Request body is required",
        };
      }

      const requiredFields: (keyof CreateUserParams)[] = [
        "firstName",
        "lastName",
        "email",
        "password",
      ];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      // Verifica se o e-mail é válido
      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "E-mail is invalid",
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
