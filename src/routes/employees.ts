import { Router } from 'express';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
} from 'src/controllers/employee.controller';
import authenticated from 'src/middlewares/authenticated';
import { hasRole } from 'src/middlewares/has-role';
import { validate } from 'src/middlewares/validate';
import {
  CreateEmployeeDto,
  PaginateEmployeeDto,
  UpdateEmployeeDto,
} from 'src/entities/employee.dto';

const router = Router();

router.get(
  '/',
  authenticated,
  hasRole('manager'),
  validate(PaginateEmployeeDto),
  getEmployees
);
router.get('/:id', authenticated, hasRole('manager'), getEmployeeById);
router.post(
  '/',
  authenticated,
  hasRole('manager'),
  validate(CreateEmployeeDto),
  createEmployee
);
router.put(
  '/:id',
  authenticated,
  hasRole('manager'),
  validate(UpdateEmployeeDto),
  updateEmployee
);
export default router;
