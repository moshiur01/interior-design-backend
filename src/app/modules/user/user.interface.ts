//student.interface.ts
import { Model } from 'mongoose';

export type IUserFilters = {
  searchTerm?: string;
  email?: string;
};

export type IUser = {
  _id: string;
  role: 'user' | 'admin' | 'super_admin';
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
};

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

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
