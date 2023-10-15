import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sentResponse';
import {
  IAdmin,
  ILoginAdminResponse,
  IRefreshTokenResponse,
} from './admin.interface';
import { Request, Response } from 'express';
import { AdminService } from './admin.service';
import config from '../../../config';

//create  admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;

  const result = await AdminService.createAdmin(adminData);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

//login admin => generate admin access and refresh token
const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AdminService.loginAdmin(loginData);

  const { refreshToken, ...others } = result;

  //set refresh token options
  const cookeOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  //set refresh token into cookies
  res.cookie('refreshToken', refreshToken, cookeOptions);

  sendResponse<ILoginAdminResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Login successfully',
    data: others,
  });
});

//generate new access token based on the refresh token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AdminService.refreshToken(refreshToken);

  //set refresh token options
  const cookeOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  //set refresh token into cookies
  res.cookie('refreshToken', refreshToken, cookeOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New access token generated successfully !',
    data: result,
  });
});

export const AdminController = {
  createAdmin,
  loginAdmin,
  refreshToken,
};
