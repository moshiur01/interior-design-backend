//student.interface.ts
import { Model } from 'mongoose';

export type IService = {
  _id: string;
  name: string;
  shortDescription: string;
  image1: string;
  image2: string;
};

export type ServiceModel = Model<IService, Record<string, unknown>>;
