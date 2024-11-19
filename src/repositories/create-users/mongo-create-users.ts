import type {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controllers/create-users/protocols";
import { MongoClient } from "../../database/mongo";
import type { User } from "../../models/user";
import type { MongoUser } from "../mongo-protocols";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }

    return MongoClient.mapDocument(user);
  }
}
