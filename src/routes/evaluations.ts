import { Router } from 'express';
import authenticated from 'src/middlewares/authenticated';
import { hasRole } from 'src/middlewares/has-role';
import {
  getEvaluations,
  getEvaluationById,
  createEvaluation,
  updateEvaluation,
  submitEvaluation,
  getPendingEvaluations,
} from 'src/controllers/evaluation.controller';
import {
  CreateEvaluationDto,
  SubmitEvaluationDto,
  UpdateEvaluationDto,
} from 'src/entities//evaluation.dto';
import { validate } from 'src/middlewares/validate';
const router = Router();

router.get('/', authenticated, hasRole('employee'), getEvaluations);
router.get('/:id', authenticated, hasRole('employee'), getEvaluationById);
router.post(
  '/',
  authenticated,
  hasRole('manager'),
  validate(CreateEvaluationDto),
  createEvaluation
);
router.put(
  '/:id',
  authenticated,
  hasRole('manager'),
  validate(UpdateEvaluationDto),
  updateEvaluation
);
router.post(
  '/:id/submit',
  authenticated,
  hasRole('employee'),
  validate(SubmitEvaluationDto),
  submitEvaluation
);
router.get(
  '/pending',
  authenticated,
  hasRole('employee'),
  getPendingEvaluations
);
export default router;
