import express from 'express';
import { fetchAllUsers, fetchUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', fetchAllUsers);
userRouter.get('/:id', fetchUser);

export default userRouter;
