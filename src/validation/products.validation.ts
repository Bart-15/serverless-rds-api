import { number, object, string, TypeOf } from 'zod';

export const createProductValidationSchema = object({
  productName: string().min(1, { message: 'Product name is required' }),
  category: string().min(1, { message: 'Category is required' }),
  unitPrice: number()
    .positive({ message: 'Invalid value' })
    .refine(val => val > 0, { message: 'Unit price must be a positive number' }),
  unitsInStock: number()
    .positive({ message: 'Invalid value' })
    .refine(val => val > 0, { message: 'Units in stock must be a positive number' }),
  discontinued: number().refine(val => val === 0 || val === 1, {
    message: 'Discontinued must be either 0 (false) or 1 (true)',
  }),
});

export type createProductPayload = TypeOf<typeof createProductValidationSchema>;
