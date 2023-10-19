import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookingService } from './booking.service';
import sendResponse from '../../../shared/sentResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { bookingFilterableFields } from './booking.constrain';
import { IBooking } from './booking,interface';
import { paginationFields } from '../../../constants/pagination';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Created Successfully',
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookingService.getAllFromDb(filters, paginationOptions);

  sendResponse<IBooking[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Data Fetched Successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getSingleById(req.params.id);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Booking Data Fetched Successfully',
    data: result,
  });
});

const updateOneIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.updateOneIntoDb(req.params.id, req.body);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Data Updated Successfully',
    data: result,
  });
});

const deleteOneFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.deleteOneFromDb(req.params.id);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking Data Deleted Successfully',
    data: result,
  });
});

export const BookingController = {
  insertIntoDb,
  getAllFromDb,
  getSingleById,
  updateOneIntoDb,
  deleteOneFromDb,
};
