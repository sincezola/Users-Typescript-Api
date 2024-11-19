import { MongoClient as Mongo, type Db, type Document } from "mongodb";

export const MongoClient = {
  // Singleton de Pooling
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || "mongodb://localhost:27017";
    const username = process.env.MONGODB_USERNAME || "root";
    const password = process.env.MONGODB_PASSWORD || "password";

    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db("users-db");

    this.client = client;
    this.db = db;

    console.log("connected to mongodb");
  },

  // Método utilitário para mapear documentos e substituir `_id` por `id`
  mapDocument<T extends Document>(doc: T): T & { id: string } {
    const { _id, ...rest } = doc;
    return { ...rest, id: _id.toHexString() } as T & { id: string };
  },

  // Método utilitário para mapear múltiplos documentos
  mapDocuments<T extends Document>(docs: T[]): Array<T & { id: string }> {
    return docs.map((doc) => this.mapDocument(doc));
  },
};
