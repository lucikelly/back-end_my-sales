import { Router } from 'express';
import CustomersControllers from "../controllers/CustumersControllers";
import AuthMiddleware from '@shared/middlewares/authMiddleware';
import {
  createCutomerSchema,
  idParamsValidate,
  updateCutomerSchema,
} from "../schemas/CustomerSchema";

const customersRouter = Router();
const customersController = new CustomersControllers();

customersRouter.use(AuthMiddleware.execute);
customersRouter.get('/', customersController.index);
customersRouter.get('/:id', idParamsValidate, customersController.show);
customersRouter.post('/', createCutomerSchema, customersController.create);
customersRouter.patch(
  '/:id',
  idParamsValidate,
  updateCutomerSchema,
  customersController.update,
);
customersRouter.delete('/:id', idParamsValidate, customersController.delete);


export default customersRouter;