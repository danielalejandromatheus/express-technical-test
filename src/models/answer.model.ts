import mongoose, { Schema } from 'mongoose';
import { QuestionModel } from './question.model';

const AnswerSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    evaluation: {
      type: Schema.Types.ObjectId,
      ref: 'Evaluation',
      required: true,
    },
    answers: [
      {
        question: {
          type: Schema.Types.ObjectId,
          ref: 'Question',
          required: true,
        },
        selected: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

AnswerSchema.methods.getScore = async function () {
  const answers = this.answers;

  const questionIds = answers.map((a: any) => a.question);
  const questions = await QuestionModel.find({
    _id: { $in: questionIds },
  });

  const questionMap = new Map(
    questions.map((q) => [q._id.toString(), q.answer])
  );
  let correct = 0;

  for (const ans of answers) {
    if (questionMap.get(ans.question.toString()) === ans.selected) {
      correct++;
    }
  }

  return Math.round((correct / answers.length) * 100);
};
AnswerSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});
export interface AnswerDocument
  extends mongoose.InferSchemaType<typeof AnswerSchema> {
  getScore: () => Promise<number>;
}

export const AnswerModel = mongoose.model<AnswerDocument>(
  'Answer',
  AnswerSchema
);
