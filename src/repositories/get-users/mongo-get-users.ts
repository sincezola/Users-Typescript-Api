import type { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import type { User } from "../../models/user";
import type { MongoUser } from "../mongo-protocols";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .find({})
      .toArray();

    // Usa o método mapDocuments para aplicar a transformação
    return MongoClient.mapDocuments(users);
  }
}
