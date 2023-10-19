/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IProject, ProjectModel } from './project.interface';
import { projectConstant } from './project.constrain';

export const projectSchema = new Schema<IProject, ProjectModel>(
  {
    image1: {
      type: String,
      required: true,
    },
    image2: {
      type: String,
      required: true,
    },
    image3: {
      type: String,
      required: true,
    },
    projectInfo: {
      type: String,
      required: true,
    },
    projectDesign: {
      type: String,
      required: true,
    },
    clientLocation: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    ProjectValue: {
      type: String,
      required: true,
    },
    projectHead: {
      type: String,
      required: true,
    },
    projectCategory: {
      type: String,
      enum: projectConstant.projectCategory,
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
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

export const Project = model<IProject, ProjectModel>('Project', projectSchema);
