//student.interface.ts
import { Model } from 'mongoose';

export type IBookingFilters = {
  searchTerm?: string;
  userEmail?: string;
  userName?: string;
  serviceName?: string;
  status?: string;
};

export type IBooking = {
  _id: string;
  userName: string;
  userEmail: string;
  serviceName: string;
  price: string;
  userPlace: string;
  dateAndTime: string;
  status: 'pending' | 'approved' | 'delivered' | 'canceled';
};

export type BookingModel = Model<IBooking, Record<string, unknown>>;
