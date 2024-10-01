import { Router } from 'express';
import * as authControllers from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';
import ctrlWrapper from '../utilits/ctrlWrapper.js';
import { userRegisterSchema, userLoginSchema } from '../validation/users.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userRegisterSchema),
  ctrlWrapper(authControllers.registerController),
);

authRouter.post(
  '/login',
  validateBody(userLoginSchema),
  ctrlWrapper(authControllers.loginController),
);

authRouter.post('/refresh', ctrlWrapper(authControllers.refreshController));
authRouter.post('/logout', ctrlWrapper(authControllers.logoutController));
export default authRouter;
