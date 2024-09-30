import { Router } from 'express';
import ctrlWrapper from '../utilits/ctrlWrapper.js';
import validateBody from '../utilits/validateBody.js';
import * as authControllers from '../controllers/auth.js';
import { userSignupSchema, userSigninSchema } from '../validation/users.js';


const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  ctrlWrapper(authControllers.signupController),
);

authRouter.post(
  '/login',
  validateBody(userSigninSchema),
  ctrlWrapper(authControllers.signinController),
);

authRouter.post('/refresh', ctrlWrapper(authControllers.refreshController));

authRouter.post('/logout', ctrlWrapper(authControllers.signoutController));
export default authRouter;
