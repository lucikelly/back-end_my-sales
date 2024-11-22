import { Router } from "express";
import SessionControllers from "../controllers/SessionControllers";
import { sessionSchema } from "../schemas/SessionSchema";

const sessionsRouter = Router()
const sessionsController = new SessionControllers()

sessionsRouter.post('/', sessionSchema, sessionsController.create);

export default sessionsRouter;