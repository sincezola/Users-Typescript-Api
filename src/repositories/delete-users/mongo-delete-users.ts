import { ObjectId } from "mongodb";
import type { IDeleteUserRepository } from "../../controllers/delete-users/protocols";
import { MongoClient } from "../../database/mongo";
import type { User } from "../../models/user";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: ObjectId });

    if (!user) {
      throw new Error("User not found.");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: ObjectId });

    if (!deletedCount) {
      throw new Error("User cannot be deleted.");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
