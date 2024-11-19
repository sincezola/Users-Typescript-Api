"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const get_users_1 = require("./controllers/get-users/get-users");
const mongo_get_users_1 = require("./repositories/get-users/mongo-get-users");
const mongo_1 = require("./database/mongo");
const mongo_create_users_1 = require("./repositories/create-users/mongo-create-users");
const create_users_1 = require("./controllers/create-users/create-users");
const mongo_update_users_1 = require("./repositories/update-users/mongo-update-users");
const update_users_1 = require("./controllers/update-users/update-users");
const mongo_delete_users_1 = require("./repositories/delete-users/mongo-delete-users");
const delete_users_1 = require("./controllers/delete-users/delete-users");
const main = async () => {
    (0, dotenv_1.config)();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    await mongo_1.MongoClient.connect();
    app.get("/users", async (_req, res) => {
        const mongoGetUsersRepository = new mongo_get_users_1.MongoGetUsersRepository();
        const getUsersController = new get_users_1.GetUsersController(mongoGetUsersRepository);
        const { body, statusCode } = await getUsersController.handle();
        res.status(statusCode).send(body);
    });
    app.post("/users", async (req, res) => {
        const mongoCreateUserRepository = new mongo_create_users_1.MongoCreateUserRepository();
        const createUserController = new create_users_1.CreateUserController(mongoCreateUserRepository);
        const { body, statusCode } = await createUserController.handle({
            body: req.body,
        });
        res.status(statusCode).send(body);
    });
    app.patch("/users/:id", async (req, res) => {
        const mongoUpdateUserRepository = new mongo_update_users_1.MongoUpdateUsersRepository();
        const updateUserController = new update_users_1.UpdateUserController(mongoUpdateUserRepository);
        const { body, statusCode } = await updateUserController.handle({
            body: req.body,
            params: req.params,
        });
        res.status(statusCode).send(body);
    });
    app.delete("/users/:id", async (req, res) => {
        const mongoDeleteUserRepository = new mongo_delete_users_1.MongoDeleteUserRepository();
        const deleteUserController = new delete_users_1.DeleteUserController(mongoDeleteUserRepository);
        const { body, statusCode } = await deleteUserController.handle({
            params: req.params,
        });
        res.status(statusCode).send(body);
    });
    const port = process.env.PORT || 3333;
    app.listen(port, () => console.log(`listening on port ${port}!`));
};
main();
