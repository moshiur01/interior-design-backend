import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/paginatioon';
import { IBooking, IBookingFilters } from './booking,interface';
import { bookingSearchableFields } from './booking.constrain';
import { Booking } from './booking.model';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const insertIntoDb = async (payload: IBooking): Promise<IBooking | null> => {
  console.log(payload);
  const result = await Booking.create(payload);

  return result;
};

const getAllFromDb = async (
  filters: IBookingFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBooking[]>> => {
  console.log(filters);
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];

  //partial match => searching
  if (searchTerm) {
    andConditions.push({
      $or: bookingSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // filtering
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
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

  const result = await Booking.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Booking.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleById = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findById({ _id: id });

  return result;
};

const updateOneIntoDb = async (
  id: string,
  payload: Partial<IBooking>
): Promise<IBooking | null> => {
  const isExists = Booking.findById({ _id: id });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking Data Not Found');
  }
  const result = Booking.findOneAndUpdate({ _id: id }, payload, { new: true });

  return result;
};

const deleteOneFromDb = async (id: string): Promise<IBooking | null> => {
  const isExists = Booking.findById({ _id: id });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking Data Not Found');
  }
  const result = Booking.findOneAndDelete({ _id: id }, { new: true });

  return result;
};

export const BookingService = {
  insertIntoDb,
  getAllFromDb,
  getSingleById,
  updateOneIntoDb,
  deleteOneFromDb,
};
