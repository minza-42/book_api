import express from 'express';
import { getAllUsers, getUser, patchUser, deleteUser } from '../controllers/userController';
import { verifyToken } from '../middleware/verifyToken';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.post('/:id', patchUser);
userRouter.delete('/:id', verifyToken, deleteUser);

export default userRouter;
