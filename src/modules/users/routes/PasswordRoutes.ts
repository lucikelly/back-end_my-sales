import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import { ForgotPasswordSchema, ResetPasswordSchema } from '../schemas/PasswordSchemas';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPassowordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  ForgotPasswordSchema,
  forgotPasswordController.create,
);

passwordRouter.post(
  '/reset',
  ResetPasswordSchema,
  resetPassowordController.create,
);

export default passwordRouter;
