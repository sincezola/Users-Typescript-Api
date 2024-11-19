"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoClient = void 0;
const mongodb_1 = require("mongodb");
exports.MongoClient = {
    // Singleton de Pooling
    client: undefined,
    db: undefined,
    async connect() {
        const url = process.env.MONGODB_URL || "mongodb://localhost:27017";
        const username = process.env.MONGODB_USERNAME || "root";
        const password = process.env.MONGODB_PASSWORD || "password";
        const client = new mongodb_1.MongoClient(url, { auth: { username, password } });
        const db = client.db("users-db");
        this.client = client;
        this.db = db;
        console.log("connected to mongodb");
    },
    // Método utilitário para mapear documentos e substituir `_id` por `id`
    mapDocument(doc) {
        const { _id, ...rest } = doc;
        return { ...rest, id: _id.toHexString() };
    },
    // Método utilitário para mapear múltiplos documentos
    mapDocuments(docs) {
        return docs.map((doc) => this.mapDocument(doc));
    },
};
