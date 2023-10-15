/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import bcrypt from 'bcrypt';
import { IUser } from './user.interface';
import { User } from './user.model';
import { JwtHelpers } from '../../../helpers/jwtHelper';
import { Secret } from 'jsonwebtoken';

const createUser = async (userData: IUser): Promise<IUser | null> => {
  const result = await User.create(userData);
  return result;
};

//get all users
const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find({});

  return result;
};

//get single user
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

// get user info
const getUserInfo = async (
  token: string | undefined
): Promise<IUser | null> => {
  if (token === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token is Undefined');
  }

  //verify  token
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelpers.verifyToken(
      token,
      config.jwt.jwt_access_token as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Access Token');
  }
  const { _id } = verifiedToken;
  const result = await User.findById(_id);
  return result;
};

//update user
const updateUser = async (
  _id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id }, updatedUserData, {
    new: true,
  });
  return result;
};

//update user
const updateUserInfo = async (
  token: string | undefined,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  if (token === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token is Undefined');
  }

  //verify  token
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelpers.verifyToken(
      token,
      config.jwt.jwt_access_token as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Access Token');
  }
  const { _id } = verifiedToken;

  const isExist = await User.findOne({ _id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const { name, ...userData } = payload;

  //if a user give a new password
  if (userData?.password) {
    userData.password = await bcrypt.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds)
    );
  }

  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  //if a user want to update his role
  if (userData?.role !== undefined && userData.role !== verifiedToken.role) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin  can update user role'
    );
  }

  //if a user give a new password
  if (userData?.password) {
    userData.password = await bcrypt.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds)
    );
  }

  const result = await User.findOneAndUpdate({ _id }, updatedUserData, {
    new: true,
  });
  return result;
};

//delete user
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserInfo,
  updateUserInfo,
};
