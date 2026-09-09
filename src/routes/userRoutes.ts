import express from 'express';
import { getAllUsers, getUser, patchUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.post('/:id', patchUser);

export default userRouter;
