/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { userConstant } from './user.constrain';

const userSchema = new Schema<IUser, UserModel>(
  {
    role: { type: String, enum: userConstant.role },
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    phoneNumber: { type: String, required: true },
    address: { type: String },
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

// Hash user password
userSchema.pre('save', async function (next) {
  // Use an arrow function to capture the surrounding 'this' context.
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// Check if user exists in DB
userSchema.methods.isUserExists = async function (
  email: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { email },
    { _id: 1, role: 1, password: 1, phoneNumber: 1, name: 1, email }
  ).lean();
  return user;
};

// Check if user password matches
userSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// Create a Model.
export const User = model<IUser, UserModel>('User', userSchema);
