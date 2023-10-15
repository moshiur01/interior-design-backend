import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import {
  IAdmin,
  ILoginAdmin,
  ILoginAdminResponse,
  IRefreshTokenResponse,
} from './admin.interface';
import { Admin } from './admin.model';
import { JwtHelpers } from '../../../helpers/jwtHelper';
import { Secret } from 'jsonwebtoken';

//create admin
const createAdmin = async (adminData: IAdmin): Promise<IAdmin | null> => {
  //  default password
  if (!adminData.password) {
    adminData.password = config.default_user_pass as string;
  }

  if (adminData.role !== 'admin') {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Role is Invalid');
  }
  const result = await Admin.create(adminData);
  return result;
};

//login admin
const loginAdmin = async (
  payload: ILoginAdmin
): Promise<ILoginAdminResponse> => {
  const { phoneNumber, password } = payload;

  //create Admin Instance
  const admin = new Admin();

  //check admin
  const isAdminExist = await admin.isAdminExists(phoneNumber);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin Does Not Exist');
  }

  //check password
  if (
    isAdminExist.password &&
    !admin.isPasswordMatch(password, isAdminExist.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { _id, role } = isAdminExist;

  //create access token
  const accessToken = JwtHelpers.createToken(
    { _id, role },
    config.jwt.jwt_access_token as Secret,
    config.jwt.jwt_access_token_expires_in as string
  );
  // refresh token
  const refreshToken = JwtHelpers.createToken(
    { _id, role },
    config.jwt.jwt_refresh_token as Secret,
    config.jwt.jwt_refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

//generate access token via refresh token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify refresh token
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh_token as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  // checking  user
  const { _id } =
    typeof verifiedToken === 'string'
      ? JSON.parse(verifiedToken)
      : verifiedToken;

  const isAdminExist = await Admin.findById(_id);

  //throw not found error
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not Exist');
  }

  //generate new access token based on the refresh token
  const newAccessToken = JwtHelpers.createToken(
    { id: isAdminExist?._id, role: isAdminExist?.role },
    config.jwt.jwt_access_token as Secret,
    config.jwt.jwt_access_token_expires_in as string
  );

  return { accessToken: newAccessToken };
};

export const AdminService = {
  createAdmin,
  loginAdmin,
  refreshToken,
};
