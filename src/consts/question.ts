import { QuestionDocument } from 'src/models/question.model';

export const QUESTION_FIELDS = [
  'evaluation',
] as const satisfies readonly (keyof QuestionDocument)[];