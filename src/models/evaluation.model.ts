// evaluation has per default period, state and type, feel free to add more fields  to the evaluation if needed
import { InferSchemaType, Schema, model, Types, Model, Query } from 'mongoose';

import {
  EVALUATION_TYPES,
  EVALUATION_PERIODS,
  EVALUATION_STATUS,
} from 'src/consts/evaluation';
import { QuestionDocument } from './question.model';
// Static data of an evaluation
const EvaluationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: EVALUATION_TYPES,
      required: true,
    },
    period: {
      type: String,
      enum: EVALUATION_PERIODS,
      required: true,
    },
    state: {
      type: String,
      enum: EVALUATION_STATUS,
      required: true,
    },
    manager: { type: Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

export interface EvaluationDocument
  extends InferSchemaType<typeof EvaluationSchema> {
  questions?: Types.DocumentArray<QuestionDocument>; // Array of question ids
}
export interface EvaluationModel extends Model<EvaluationDocument> {
  findByManager(
    managerId: string
  ): Query<EvaluationDocument[], EvaluationDocument>;
  findDoneByUser(
    userId: string
  ): Query<EvaluationDocument[], EvaluationDocument>;
  findPendingByUser(
    userId: string
  ): Query<EvaluationDocument[], EvaluationDocument>;
}
EvaluationSchema.statics.findByManager = function (
  managerId: Types.ObjectId | string
) {
  return this.find({ manager: managerId });
};

EvaluationSchema.statics.findCompletedByUser = function (
  userId: Types.ObjectId | string
) {
  return this.find({ 'answers.user': userId });
};

EvaluationSchema.statics.findPendingByUser = function (
  userId: Types.ObjectId | string
) {
  return this.find({ 'answers.user': { $ne: userId } });
};
EvaluationSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'evaluation',
});
EvaluationSchema.set('toObject', { virtuals: true });
EvaluationSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
export const EvaluationModel = model<EvaluationDocument, EvaluationModel>(
  'Evaluation',
  EvaluationSchema
);
