/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './user.interface';
import { userConstant } from './user.constrain';
import config from '../../../config';

export const userSchema = new Schema<IUser, UserModel>(
  {
    role: {
      type: String,
      enum: userConstant.role,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

//instance method functionality

//check user exist in DB
userSchema.methods.isUserExists = async function (
  email: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { email },
    { _id: 1, role: 1, password: 1, name: 1 }
  ).lean();
  return user;
};

//check user password matched instance
userSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  //check matched password  //bcrypt.compare(plainText, bcryptPassword)
  return await bcrypt.compare(givenPassword, savedPassword);
};

//hash user password
userSchema.pre('save', async function (next) {
  const user = this;
  //password hashing
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
