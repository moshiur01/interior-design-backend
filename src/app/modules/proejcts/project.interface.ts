//student.interface.ts
import { Model, Types } from 'mongoose';
import { IService } from '../service/service.interface';

export type IProjectFilters = {
  projectCategory?: string;
};

export type IProject = {
  _id: string;
  image1: string;
  image2: string;
  image3: string;
  projectInfo: string;
  projectDesign: string;
  clientName: string;
  clientLocation: string;
  ProjectValue: string;
  projectHead: string;
  projectCategory: string;
  serviceId: Types.ObjectId | IService;
};

export type ProjectModel = Model<IProject, Record<string, unknown>>;
