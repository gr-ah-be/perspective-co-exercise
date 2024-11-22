import { Router } from 'express';
import { createUserHandler, getUsersHandler } from '../controllers/user.controller';

import { validate } from '../routers/middlewares/validation.middleware';
import { createUserSchema, getUsersQuerySchema } from '../models/user.schema';

const userRouter = Router();

userRouter.post('/', validate(createUserSchema), createUserHandler);
userRouter.get('/', validate(getUsersQuerySchema), getUsersHandler);

export { userRouter };
