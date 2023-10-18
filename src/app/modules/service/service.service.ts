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
  const result = Service.findById(id);
  return result;
};

const updateOneIntoDb = async (
  id: string,
  payload: Partial<IService>
): Promise<IService | null> => {
  const result = Service.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteOneFromDB = async (id: string): Promise<IService | null> => {
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
