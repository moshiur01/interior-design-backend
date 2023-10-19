import express from 'express';
import { projectController } from './project.controller';
const router = express.Router();

router.get('/:id', projectController.getSingleById);
router.get('/', projectController.getAllFromDb);
router.post('/', projectController.insertIntoDb);
router.patch('/:id', projectController.updateOneIntoDb);
router.delete('/:id', projectController.deleteOneFromDb);

export const ProjectRoutes = router;
