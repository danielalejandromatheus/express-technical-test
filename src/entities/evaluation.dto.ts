import mongoose from 'mongoose';
import {
  EVALUATION_FIELDS,
  EVALUATION_PERIODS,
  EVALUATION_STATUS,
  EVALUATION_TYPES,
} from 'src/consts/evaluation';
import { z } from 'zod';
import { createPaginationDto, ObjectIdSchema } from './common.dto';
export const PaginateEvaluationDto = createPaginationDto(EVALUATION_FIELDS);
export type PaginateEvaluationDtoType = z.infer<typeof PaginateEvaluationDto>;
export const CreateEvaluationDto = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(EVALUATION_TYPES),
  period: z.enum(EVALUATION_PERIODS),
  state: z.enum(EVALUATION_STATUS),
  manager: ObjectIdSchema.optional(),
});
export type CreateEvaluationDtoType = z.infer<typeof CreateEvaluationDto>;
export const UpdateEvaluationDto = CreateEvaluationDto.partial().extend({
  id: ObjectIdSchema,
});
export type UpdateEvaluationDtoType = z.infer<typeof UpdateEvaluationDto>;
export const SubmitEvaluationDto = z.object({
  answers: z.array(
    z.object({
      question: ObjectIdSchema,
      // we could query the amount of questions in the evaluation so it's not out of bounds
      selected: z.number().min(0),
    })
  ),
});
export type SubmitEvaluationDtoType = z.infer<typeof SubmitEvaluationDto>;
