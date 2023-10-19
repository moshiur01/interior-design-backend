import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { service } from './service.service';
import sendResponse from '../../../shared/sentResponse';
import { IService } from './service.interface';
import httpStatus from 'http-status';

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await service.createService(req.body);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Created Successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await service.getAllFromDB();

  sendResponse<IService[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service Fetched Successfully',
    data: result,
  });
});

const GetById = catchAsync(async (req: Request, res: Response) => {
  const result = await service.GetById(req.params.id);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Service Fetched Successfully',
    data: result,
  });
});

const updateOneIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await service.updateOneIntoDb(req.params.id, req.body);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Service Updated Successfully',
    data: result,
  });
});

const deleteOneFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await service.deleteOneFromDB(req.params.id);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Service Deleted Successfully',
    data: result,
  });
});

const insertReviewByUser = catchAsync(async (req: Request, res: Response) => {
  const result = await service.insertReviewByUser(req.params.id, req.body);

  sendResponse<Partial<IService>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Added Successfully',
    data: result,
  });
});

const deleteReviewByUser = catchAsync(async (req: Request, res: Response) => {
  const result = await service.deleteReviewByUser(
    req.params.id,
    req.body,
    req.user
  );

  sendResponse<Partial<IService>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Deleted Successfully',
    data: result,
  });
});

export const serviceController = {
  createService,
  getAllFromDB,
  GetById,
  updateOneIntoDb,
  deleteOneFromDB,
  insertReviewByUser,
  deleteReviewByUser,
};
