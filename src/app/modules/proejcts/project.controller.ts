import httpStatus from 'http-status';
import sendResponse from '../../../shared/sentResponse';
import { ProjectService } from './project.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { projectFilterableFields } from './project.constrain';
import { IProject } from './project.interface';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Created Successfully',
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, projectFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProjectService.getAllFromDb(filters, paginationOptions);

  sendResponse<IProject[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Data Fetched Successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleById = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getSingleById(req.params.id);

  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Project Data Fetched Successfully',
    data: result,
  });
});

const updateOneIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.updateOneIntoDb(req.params.id, req.body);

  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Data Updated Successfully',
    data: result,
  });
});

const deleteOneFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.deleteOneFromDb(req.params.id);

  sendResponse<IProject>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project Data Deleted Successfully',
    data: result,
  });
});

export const projectController = {
  insertIntoDb,
  getAllFromDb,
  getSingleById,
  updateOneIntoDb,
  deleteOneFromDb,
};
