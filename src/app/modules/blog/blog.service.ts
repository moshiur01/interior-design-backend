import httpStatus from 'http-status';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/paginatioon';
import { paginationHelper } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';

const insertIntoDb = async (payload: IBlog): Promise<IBlog | null> => {
  console.log(payload);
  const result = await Blog.create(payload);
  return result;
};

const getAllFromDb = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBlog[]>> => {
  //pagination term
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  //sort condition
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Blog.find({})
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Blog.countDocuments({});

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleById = async (id: string): Promise<IBlog | null> => {
  const isExists = await Blog.findById({ _id: id });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog Data Not Found');
  }

  const result = await Blog.findById({ _id: id });

  return result;
};

export const BlogService = {
  insertIntoDb,
  getAllFromDb,
  getSingleById,
};
