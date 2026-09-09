import express from 'express';
import { fetchAllUsers } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', fetchAllUsers);

export default userRouter;
