import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginatioon';
import { IProject, IProjectFilters } from './project.interface';
import { Project } from './project.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const insertIntoDb = async (payload: IProject): Promise<IProject | null> => {
  console.log(payload);
  const result = (await Project.create(payload)).populate('serviceId');
  return result;
};

const getAllFromDb = async (
  filters: IProjectFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProject[]>> => {
  console.log(filters);

  const andConditions = [];

  // filtering
  if (Object.keys(filters).length) {
    andConditions.push({
      $and: Object.entries(filters).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  //pagination term
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  //sort condition
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  //cheek either the condition is empty or not
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Project.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleById = async (id: string): Promise<IProject | null> => {
  const isExists = await Project.findById({ _id: id });
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project Data Not Found');
  }

  const result = await Project.findById({ _id: id });

  return result;
};

const updateOneIntoDb = async (
  id: string,
  payload: Partial<IProject>
): Promise<IProject | null> => {
  const isExists = await Project.findById({ _id: id });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project Data Not Found');
  }
  const result = await Project.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteOneFromDb = async (id: string): Promise<IProject | null> => {
  const isExists = await Project.findById({ _id: id });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project Data Not Found');
  }
  const result = await Project.findOneAndDelete({ _id: id }, { new: true });

  return result;
};

export const ProjectService = {
  insertIntoDb,
  getAllFromDb,
  getSingleById,
  updateOneIntoDb,
  deleteOneFromDb,
};
