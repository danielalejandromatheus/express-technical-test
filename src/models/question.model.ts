// Questions of an evaluation, for this MVP let's say there's only one right answer per s to keeep it simple

import { InferSchemaType, model, Schema } from 'mongoose';

export const QuestionSchema = new Schema(
  {
    evaluation: {
      type: Schema.Types.ObjectId,
      ref: 'Evaluation',
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    questions: {
      type: [String],
      required: true,
    },
    // This is the number of the right answer in the array, so if the array is [a,b,c,d] and the right answer is c, then the answer is 2
    answer: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
QuestionSchema.index({ evaluation: 1, order: 1 }, { unique: true });
QuestionSchema.pre('validate', async function (next) {
  if (this.isNew && this.order === undefined) {
    const lastQuestion = await model('Question')
      .findOne({
        evaluation: this.evaluation,
      })
      .sort('-order');

    this.order = lastQuestion?.order != null ? lastQuestion.order + 1 : 1;
  }

  next();
});
QuestionSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});
export type QuestionDocument = InferSchemaType<typeof QuestionSchema>;

export const QuestionModel = model<QuestionDocument>(
  'Question',
  QuestionSchema
);
