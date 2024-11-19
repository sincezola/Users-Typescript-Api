"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoGetUsersRepository = void 0;
const mongo_1 = require("../../database/mongo");
class MongoGetUsersRepository {
    async getUsers() {
        const users = await mongo_1.MongoClient.db
            .collection("users")
            .find({})
            .toArray();
        // Usa o método mapDocuments para aplicar a transformação
        return mongo_1.MongoClient.mapDocuments(users);
    }
}
exports.MongoGetUsersRepository = MongoGetUsersRepository;
