import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/:id', UserController.getSingleUser);
router.get('/', UserController.getAllUsers);
router.post('/create', UserController.createUser);
router.post('/:id', UserController.updateUser);

export const UserRoutes = router;
