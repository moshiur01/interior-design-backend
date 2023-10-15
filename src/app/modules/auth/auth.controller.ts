import { Request, Response } from 'express';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sentResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  //set refresh token options
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  //set refresh token into cookies
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login Successfully',
    data: others,
  });
});

//generate new access token based on the refresh token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  //set refresh token options
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  //set refresh token into cookies
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New access token generated successfully !',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
