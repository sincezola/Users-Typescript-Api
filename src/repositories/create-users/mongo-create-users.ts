import type {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controllers/create-users/protocols";
import { MongoClient } from "../../database/mongo";
import type { User } from "../../models/user";

export class MongroCreateUser implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
