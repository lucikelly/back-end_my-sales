import { Router } from "express";
import UsersControllers from "../controllers/UsersControllers";
import { createUserSchema } from "../schemas/UserSchemas";
import AuthMiddleware from "@shared/middlewares/authMiddleware";

const usersRouter = Router();
const UsersController = new UsersControllers()

usersRouter.get('/', AuthMiddleware.execute, UsersController.index);
usersRouter.post('/', createUserSchema, UsersController.create)

export default usersRouter;
