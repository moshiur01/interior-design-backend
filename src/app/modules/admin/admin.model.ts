/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { AdminModel, IAdmin } from './admin.interface';
import { userConstant } from '../user/user.constrain';
import config from '../../../config';

export const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: userConstant.role,
    },
    password: {
      type: String,
      select: 0,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
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

//check admin exist in DB
adminSchema.methods.isAdminExists = async function (
  phoneNumber: string
): Promise<Partial<IAdmin> | null> {
  const admin = await Admin.findOne(
    { phoneNumber },
    { _id: 1, phoneNumber: 1, role: 1, password: 1 }
  ).lean();
  return admin;
};

//check admin password matched instance
adminSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

//hash user password
adminSchema.pre('save', async function (next) {
  const admin = this;
  //password hashing
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
