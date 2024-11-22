import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import { createUserSchema } from "../schemas/UserSchemas";

const usersRouter = Router();
const UsersController = new UsersControllers()

usersRouter.get('/', UsersController.index);
usersRouter.post('/', createUserSchema, UsersController.create)

export default usersRouter;
