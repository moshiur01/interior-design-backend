import { Model } from 'mongoose';

export type IBlog = {
  _id: string;
  image: string;
  heading: string;
  description: string;
};
export type BlogModel = Model<IBlog, Record<string, unknown>>;
