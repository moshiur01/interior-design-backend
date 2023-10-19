import express from 'express';
import { BlogController } from './blog.controller';

const router = express.Router();

router.get('/:id', BlogController.getSingleById);
router.get('/', BlogController.getAllFromDb);
router.post('/', BlogController.insertIntoDb);

export const BlogRoutes = router;
