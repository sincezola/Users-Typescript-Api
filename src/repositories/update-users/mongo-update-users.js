"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUpdateUsersRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../database/mongo");
class MongoUpdateUsersRepository {
    async updateUser(id, params) {
        // Verifica se o ID é válido
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new Error("Invalid user ID");
        }
        const objectId = new mongodb_1.ObjectId(id);
        // Atualiza o usuário
        const updateResult = await mongo_1.MongoClient.db.collection("users").updateOne({ _id: objectId }, // Usa `_id` como filtro
        {
            $set: {
                ...params,
            },
        });
        if (updateResult.matchedCount === 0) {
            throw new Error("User not found");
        }
        // Recupera o usuário atualizado
        const users = await mongo_1.MongoClient.db
            .collection("users")
            .findOne({ _id: objectId });
        if (!users) {
            throw new Error("User cannot be updated");
        }
        return mongo_1.MongoClient.mapDocument(users);
    }
}
exports.MongoUpdateUsersRepository = MongoUpdateUsersRepository;
