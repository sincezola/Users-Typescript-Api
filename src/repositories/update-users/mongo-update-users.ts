import { ObjectId } from "mongodb";
import type {
  IUpdateUserRepository,
  UpdateUserParams,
} from "../../controllers/update-users/protocols";
import type { User } from "../../models/user";
import { MongoClient } from "../../database/mongo";

export class MongoUpdateUsersRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    // Verifica se o ID é válido
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid user ID");
    }

    const objectId = new ObjectId(id);

    // Atualiza o usuário
    const updateResult = await MongoClient.db.collection("users").updateOne(
      { _id: objectId }, // Usa `_id` como filtro
      {
        $set: {
          ...params,
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      throw new Error("User not found");
    }

    // Recupera o usuário atualizado
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: objectId });

    if (!user) {
      throw new Error("User not updated");
    }

    // Extrai o `_id` e recria o objeto
    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
