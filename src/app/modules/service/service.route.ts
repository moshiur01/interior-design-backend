import express from 'express';
import { serviceController } from './service.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../middleware/user';

const router = express.Router();

router.get('/', serviceController.getAllFromDB);
router.get('/:id', serviceController.GetById);

router.post('/create', serviceController.createService);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  serviceController.updateOneIntoDb
);

router.patch(
  '/insert-review/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  serviceController.insertReviewByUser
);

router.delete('/delete-review/:id', serviceController.deleteReviewByUser);

router.delete('/:id', serviceController.deleteOneFromDB);

export const ServiceRoute = router;
