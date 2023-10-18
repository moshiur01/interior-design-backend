/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IService } from './service.interface';
import { Service } from './service.model';

const createService = async (payload: IService): Promise<IService | null> => {
  const result = await Service.create(payload);
  return result;
};

const getAllFromDB = async (): Promise<IService[] | null> => {
  const result = Service.find({});
  return result;
};

const GetById = async (id: string): Promise<IService | null> => {
  const existingService = await Service.findById(id);

  if (!existingService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service is not Found');
  }

  const result = Service.findById(id);

  return result;
};

const updateOneIntoDb = async (
  id: string,
  payload: Partial<IService>
): Promise<IService | null> => {
  // Find the existing document by ID
  const existingService = await Service.findById(id);

  if (!existingService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service is not Found');
  }

  // Check if the payload contains the 'price' field and it's an array or not
  if (payload.price && Array.isArray(payload.price)) {
    // Iterate over the payload array to update prices by position value
    payload.price.forEach(priceUpdate => {
      if (existingService.price[priceUpdate?.position]) {
        // Update 'name' if found
        if (priceUpdate.name) {
          existingService.price[priceUpdate?.position].name = priceUpdate.name;
        }
        // Update 'price' if found
        if (!isNaN(priceUpdate.price)) {
          existingService.price[priceUpdate?.position].price =
            priceUpdate.price;
        }
      }
    });
  }

  delete payload.price;

  Object.assign(existingService, payload);

  const result = await existingService.save();

  return result;
};

const deleteOneFromDB = async (id: string): Promise<IService | null> => {
  const existingService = await Service.findById(id);

  if (!existingService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service is not Found');
  }

  const result = Service.findByIdAndDelete({ _id: id });
  return result;
};

export const service = {
  createService,
  getAllFromDB,
  GetById,
  updateOneIntoDb,
  deleteOneFromDB,
};
