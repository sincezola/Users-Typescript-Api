import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import router from "./routes/users";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());
  app.use(router);

  await MongoClient.connect();

  const port = process.env.PORT || 3333;

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
