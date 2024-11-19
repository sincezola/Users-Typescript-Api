"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDeleteUserRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../database/mongo");
class MongoDeleteUserRepository {
    async deleteUser(id) {
        const user = await mongo_1.MongoClient.db
            .collection("users")
            .findOne({ _id: mongodb_1.ObjectId });
        if (!user) {
            throw new Error("User not found.");
        }
        const { deletedCount } = await mongo_1.MongoClient.db
            .collection("users")
            .deleteOne({ _id: mongodb_1.ObjectId });
        if (!deletedCount) {
            throw new Error("User cannot be deleted.");
        }
        return mongo_1.MongoClient.mapDocument(user);
    }
}
exports.MongoDeleteUserRepository = MongoDeleteUserRepository;
