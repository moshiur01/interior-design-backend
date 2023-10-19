/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { BookingModel, IBooking } from './booking,interface';
import { bookingStatus } from './booking.constrain';

export const bookingSchema = new Schema<IBooking, BookingModel>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userPlace: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    dateAndTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: bookingStatus,
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

export const Booking = model<IBooking, BookingModel>('Booking', bookingSchema);
