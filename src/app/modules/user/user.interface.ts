import { Model } from 'mongoose';

export type IUser = {
  role: 'user' | 'admin' | 'super_admin';
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address?: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

// Put all user instance methods in this interface
export type IUserMethods = {
  //instance 1
  isUserExists(email: string): Promise<Partial<IUser> | null>;

  //instance 2
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};
