import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { JwtHelpers } from '../../../helpers/jwtHelper';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

//generate new user access and refresh token
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  //create User Instance
  const user = new User();

  // Check user existence
  const isUserExist = await user.isUserExists(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does Not Exists');
  }

  //check password
  if (
    isUserExist.password &&
    !user.isPasswordMatch(password, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token
  const { _id, role, name } = isUserExist;
  console.log(isUserExist);

  const accessToken = JwtHelpers.createToken(
    { _id, role, name },
    config.jwt.jwt_access_token as Secret,
    config.jwt.jwt_access_token_expires_in as string
  );

  // refresh token
  const refreshToken = JwtHelpers.createToken(
    { _id, role, name },
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
    // console.log(verifiedToken);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  //checking  user
  const { _id } =
    typeof verifiedToken === 'string'
      ? JSON.parse(verifiedToken)
      : verifiedToken;

  const isUserExist = await User.findById(_id);

  //throw not found error
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not Exist');
  }

  //generate new access token based on the refresh token
  const newAccessToken = JwtHelpers.createToken(
    { id: isUserExist?._id, role: isUserExist?.role, name: isUserExist?.name },
    config.jwt.jwt_access_token as Secret,
    config.jwt.jwt_access_token_expires_in as string
  );

  return { accessToken: newAccessToken };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
