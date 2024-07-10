import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserValidationSchema, registerUserValidationSchema } from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserValidationSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserValidationSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
