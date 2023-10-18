import express from 'express';
import { serviceController } from './service.controller';

const router = express.Router();

router.get('/', serviceController.getAllFromDB);
router.get('/:id', serviceController.GetById);

router.post('/create', serviceController.createService);

router.patch('/:id', serviceController.updateOneIntoDb);

router.delete('/:id', serviceController.deleteOneFromDB);

export const ServiceRoute = router;
