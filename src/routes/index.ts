import { Router } from 'express';
import authRoutes from './auth';
import employeeRoutes from './employees';
import evaluationRoutes from './evaluations';
import questionRoutes from './questions';
import reportRoutes from './reports';
const router = Router();

router.use('/auth', authRoutes);
router.use('/employees', employeeRoutes);
router.use('/evaluations', evaluationRoutes);
router.use('/questions', questionRoutes);
router.use('/reports', reportRoutes);
export default router;
