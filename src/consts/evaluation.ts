import { EvaluationDocument } from 'src/models/evaluation.model';

export const EVALUATION_TYPES = ['self', 'peer', 'manager'] as const;
export const EVALUATION_PERIODS = ['monthly', 'quarterly', 'yearly'] as const;
export const EVALUATION_STATUS = ['draft', 'published', 'archived'] as const;
export const EVALUATION_FIELDS = [
  'name',
  'type',
  'period',
  'state',
  'answers.user',
  'manager',
] as const;
