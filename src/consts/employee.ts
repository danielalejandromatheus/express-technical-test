import { EmployeeDocument } from 'src/models/employee.model';

export const EMPLOYEE_STATUS = ['active', 'inactive', 'terminated'] as const;
export const EMPLOYEE_FIELDS = [
  'fullName',
  'email',
  'department',
  'position',
  'manager',
  'status',
] as const satisfies readonly (keyof EmployeeDocument)[];
