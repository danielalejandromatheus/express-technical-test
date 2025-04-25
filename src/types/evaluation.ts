import {
  EVALUATION_PERIODS,
  EVALUATION_STATUS,
  EVALUATION_TYPES,
} from 'src/consts/evaluation';

export type EvaluationType = (typeof EVALUATION_TYPES)[number];
export type EvaluationPeriod = (typeof EVALUATION_PERIODS)[number];
export type EvaluationStatus = (typeof EVALUATION_STATUS)[number];
