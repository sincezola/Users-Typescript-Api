import { Router } from "express";
import { MongoGetUsersRepository } from "../repositories/get-users/mongo-get-users";
import { GetUsersController } from "../controllers/get-users/get-users";
import { MongoCreateUserRepository } from "../repositories/create-users/mongo-create-users";
import { CreateUserController } from "../controllers/create-users/create-users";
import { UpdateUserController } from "../controllers/update-users/update-users";
import { MongoUpdateUsersRepository } from "../repositories/update-users/mongo-update-users";
import { DeleteUserController } from "../controllers/delete-users/delete-users";
import { MongoDeleteUserRepository } from "../repositories/delete-users/mongo-delete-users";
import { MongoGetUserRepository } from "../repositories/get-users/mongo-get-user";
import { GetUserController } from "../controllers/get-user/get-user";

const router = Router();

router.get("/users", async (_req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();

  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.status(statusCode).send(body);
});

router.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const mongoGetUserRepository = new MongoGetUserRepository();
    const getUserController = new GetUserController(mongoGetUserRepository);

    const httpRequest = {
      params: { id },
    };

    // Passa o HttpRequest para o método handle
    const { body, statusCode } = await getUserController.handle(httpRequest);

    res.status(statusCode).send(body);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});


router.post("/users", async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();

  const createUserController = new CreateUserController(
    mongoCreateUserRepository
  );

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

router.patch("/users/:id", async (req, res) => {
  const mongoUpdateUserRepository = new MongoUpdateUsersRepository();

  const updateUserController = new UpdateUserController(
    mongoUpdateUserRepository
  );

  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
    params: req.params,
  });

  res.status(statusCode).send(body);
});

router.delete("/users/:id", async (req, res) => {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository();

  const deleteUserController = new DeleteUserController(
    mongoDeleteUserRepository
  );

  const { body, statusCode } = await deleteUserController.handle({
    params: req.params,
  });

  res.status(statusCode).send(body);
});

export default router;
