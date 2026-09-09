import express from 'express';
import { fetchAllUsers, fetchUser, patchUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', fetchAllUsers);
userRouter.get('/:id', fetchUser);
userRouter.post('/:id', patchUser);

export default userRouter;
