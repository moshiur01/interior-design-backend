import { Schema, model } from 'mongoose';
import { BlogModel, IBlog } from './blog.interface';

export const blogSchema = new Schema<IBlog, BlogModel>(
  {
    image: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Blog = model<IBlog, BlogModel>('Blog', blogSchema);
