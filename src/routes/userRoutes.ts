import express from 'express';
import { getAllUsers, getUser, patchUser, deleteUser } from '../controllers/userController';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/:id', patchUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;
