// Questions have evaluation, question array and the answer that is a number that points to the right answer in the questions array, it should be no less than 0 and no more than the current amount of questions - 1 for indexing

import { z } from 'zod';
import { ObjectIdSchema } from './common.dto';
import { createPaginationDto } from './common.dto';
import { QUESTION_FIELDS } from 'src/consts/question';

export const PaginateQuestionDto = createPaginationDto(QUESTION_FIELDS);
export type PaginateQuestionDtoType = z.infer<typeof PaginateQuestionDto>;
const BaseQuestionDto = z.object({
  evaluation: ObjectIdSchema,
  questions: z.array(z.string()).min(1),
  answer: z.number().min(0),
});

export const CreateQuestionDto = BaseQuestionDto.refine(
  (data) => {
    if (data.answer >= data.questions.length) {
      return false; // Answer index is out of bounds
    }
    return true;
  },
  {
    message: 'Answer must be less than the number of questions',
  }
);
export type CreateQuestionDtoType = z.infer<typeof CreateQuestionDto>;

export const UpdateQuestionDto = BaseQuestionDto.partial()
  .extend({
    id: ObjectIdSchema,
  })
  .omit({
    evaluation: true,
  })
  .refine(
    (data) => {
      if (!data.answer || !data.questions) return true;
      if (data.answer >= data.questions.length) {
        return false;
      } else {
        return true;
      }
    },
    {
      message: 'Answer must be less than the number of questions',
    }
  );
export type UpdateQuestionDtoType = z.infer<typeof UpdateQuestionDto>;
