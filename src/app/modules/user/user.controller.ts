import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sentResponse';
import { IUser } from './user.interface';
import pick from '../../../shared/pick';
import { userFilterableFields } from './user.constrain';
import { paginationFields } from '../../../constants/pagination';

//create  user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  userData['role'] = 'user';

  const result = await UserService.createUser(userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

//get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users data Retrieved Successfully',
    data: result.data,
    meta: result.meta,
  });
});

//get single User
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved Successfully',
    data: result,
  });
});

//update user
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const _id = req.params.id;
  const updatedData = req.body;

  const result = await UserService.updateUser(_id, updatedData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Data Updated successfully',
    data: result,
  });
});

//update user info
const updateUserInfo = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body;
  const token = req.headers.authorization;
  const result = await UserService.updateUserInfo(token, updatedData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Data Updated successfully',
    data: result,
  });
});

//delete user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  updateUserInfo,
};
