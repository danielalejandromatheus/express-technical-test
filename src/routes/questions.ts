import { Router } from 'express';
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
} from 'src/controllers/question.controller';
import authenticated from 'src/middlewares/authenticated';
import { hasRole } from 'src/middlewares/has-role';
import { validate } from 'src/middlewares/validate';
import {
  PaginateQuestionDto,
  CreateQuestionDto,
  UpdateQuestionDto,
} from 'src/entities/question.dto';

const router = Router();

router.get(
  '/',
  authenticated,
  hasRole('manager'),
  validate(PaginateQuestionDto),
  getQuestions
);
router.get('/:id', authenticated, hasRole('manager'), getQuestionById);
router.post(
  '/',
  authenticated,
  hasRole('manager'),
  validate(CreateQuestionDto),
  createQuestion
);
router.put(
  '/:id',
  authenticated,
  hasRole('manager'),
  validate(UpdateQuestionDto),
  updateQuestion
);
export default router;
