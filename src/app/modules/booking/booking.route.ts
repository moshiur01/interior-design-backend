import express from 'express';
import { BookingController } from './booking.controller';
import validateRequest from '../../middleware/validateRequest';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.get('/:id', BookingController.getSingleById);

router.get('/', BookingController.getAllFromDb);

router.post(
  '/create',
  validateRequest(BookingValidation.createBookingZodSchema),
  BookingController.insertIntoDb
);

router.patch(
  '/:id',
  validateRequest(BookingValidation.updateBookingZodSchema),
  BookingController.updateOneIntoDb
);

router.delete('/:id', BookingController.deleteOneFromDb);

export const BookingRoutes = router;
