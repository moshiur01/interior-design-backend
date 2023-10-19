import { z } from 'zod';

const createBookingZodSchema = z.object({
  body: z.object({
    userName: z.string({
      required_error: 'User name is required',
    }),
    userEmail: z.string(),
    serviceName: z.string({
      required_error: 'Service name is required',
    }),
    price: z.string({
      required_error: 'Price is required',
    }),
    dateAndTime: z.string({
      required_error: 'Date a nd time is required',
    }),
  }),
});

const updateBookingZodSchema = z.object({
  body: z.object({
    userName: z.string().optional(),
    userEmail: z.string().optional(),
    serviceName: z.string().optional(),
    price: z.string().optional(),
    dateAndTime: z.string().optional(),
  }),
});

export const BookingValidation = {
  createBookingZodSchema,
  updateBookingZodSchema,
};
