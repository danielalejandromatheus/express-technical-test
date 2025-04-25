import { Router } from 'express';
import {
  getEmployeeReport,
  getDepartmentReport,
} from 'src/controllers/reports.controller';
import authenticated from 'src/middlewares/authenticated';
import { hasRole } from 'src/middlewares/has-role';

const router = Router();
router.get(
  '/employee/:id',
  authenticated,
  hasRole('manager'),
  getEmployeeReport
);
router.get(
  '/department/:department',
  authenticated,
  hasRole('manager'),
  getDepartmentReport
);
export default router;
