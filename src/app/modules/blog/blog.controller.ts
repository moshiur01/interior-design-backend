import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BlogService } from './blog.service';
import sendResponse from '../../../shared/sentResponse';
import httpStatus from 'http-status';
import { IBlog } from './blog.interface';
import { paginationFields } from '../../../constants/pagination';
import pick from '../../../shared/pick';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Created Successfully',
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BlogService.getAllFromDb(paginationOptions);

  sendResponse<IBlog[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Data Fetched Successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleById = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getSingleById(req.params.id);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single blog Data Fetched Successfully',
    data: result,
  });
});

export const BlogController = {
  insertIntoDb,
  getAllFromDb,
  getSingleById,
};
