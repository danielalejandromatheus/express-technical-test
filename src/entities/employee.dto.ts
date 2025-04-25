// firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   zip: { type: String, required: true },
//   country: { type: String, required: true },
//   dateOfBirth: { type: Date, required: true },
//   dateOfJoining: { type: Date, required: true },
//   department: { type: String, required: true },
//   position: { type: String, required: true },
//   salary: { type: Number, required: true },
//   status: {
//     type: String,
//     required: true,
//     enum: ['active', 'inactive', 'terminated'],
//   },

import { EMPLOYEE_FIELDS, EMPLOYEE_STATUS } from 'src/consts/employee';
import { z } from 'zod';
import { LoginDto } from './auth.dto';
import { ObjectIdSchema, createPaginationDto } from './common.dto';
export const PaginateEmployeeDto = createPaginationDto(EMPLOYEE_FIELDS);
export type PaginateEmployeeDtoType = z.infer<typeof PaginateEmployeeDto>;
export const CreateEmployeeDto = z.object({
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  address: z.string().min(5).max(100),
  city: z.string().min(2).max(50),
  state: z.string().min(2).max(50),
  zip: z.string().min(3).max(10),
  country: z.string().min(2).max(50),
  dateOfBirth: z.coerce.date(),
  dateOfJoining: z.coerce.date(),
  department: z.string().min(2).max(50),
  position: z.string().min(3).max(50),
  salary: z.number().positive(),
  status: z.enum(EMPLOYEE_STATUS),
  manager: ObjectIdSchema.optional(),
  user: LoginDto,
});
export type CreateEmployeeDtoType = z.infer<typeof CreateEmployeeDto>;
export const UpdateEmployeeDto = CreateEmployeeDto.partial()
  .extend({
    id: ObjectIdSchema,
  })
  .omit({
    user: true,
  });
export type UpdateEmployeeDtoType = z.infer<typeof UpdateEmployeeDto>;
