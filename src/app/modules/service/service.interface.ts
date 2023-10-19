//student.interface.ts
import { Model } from 'mongoose';

export type servicePrice = {
  name: string;
  price: number;
  position: number;
};

export type review = {
  _id: string;
  userId: string;
  userName: string;
  userImg: string;
  reviewBody: string;
  rating: number;
};

export type IService = {
  _id: string;
  name: string;
  description: string;
  shortDescription: string;
  image1: string;
  image2: string;
  price: servicePrice[];
  userReviews?: review[];
};

export type ServiceModel = Model<IService, Record<string, unknown>>;
