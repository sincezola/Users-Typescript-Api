import { MongoClient } from "../../database/mongo";
import type { IGetUserRepository } from "../../controllers/get-user/protocols";
import type { User } from "../../models/user";
import type { MongoUser } from "../mongo-protocols";
import { ObjectId } from "mongodb";

export class MongoGetUserRepository implements IGetUserRepository {
  async getUser(id: string): Promise<User | null> {
    const objectId = new ObjectId(id);

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: objectId });

    return user ? MongoClient.mapDocument(user) : null;
  }
}
