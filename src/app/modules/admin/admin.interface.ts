import { Model } from 'mongoose';

export type IAdmin = {
  _id?: string;
  phoneNumber: string;
  role: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
};

//login interface
export type ILoginAdmin = {
  phoneNumber: string;
  password: string;
};

//login response interface
export type ILoginAdminResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

// Put all admins instance methods in this interface
export type IAdminMethods = {
  //instance 1
  isAdminExists(phoneNumber: string): Promise<Partial<IAdmin> | null>;

  //instance 2
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>, IAdminMethods>;
