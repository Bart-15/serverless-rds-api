import { object, string, TypeOf } from 'zod';

export const createEmployeeValidationSchema = object({
  firstName: string().min(1, { message: 'First name is required' }),
  lastName: string().min(1, { message: 'Last name is required' }),
  dept: string().min(1, { message: 'Department is required' }),
});

export type createEmployeePayload = TypeOf<typeof createEmployeeValidationSchema>;
