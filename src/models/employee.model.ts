// Personal information of employees using mongoose
import { InferSchemaType, model, Schema, Types } from 'mongoose';
import { EMPLOYEE_STATUS } from 'src/consts/employee';
import { AnswerDocument } from './answer.model';
// employees should have an evaluator which is a manager related to the users
export const EmployeeSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    dateOfJoining: { type: Date, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    // This is the reference to the user who is the manager of the employee
    manager: { type: Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      required: true,
      enum: EMPLOYEE_STATUS,
    },
    // This is the reference to the user who is the employee
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
EmployeeSchema.pre('save', function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});
EmployeeSchema.virtual('evaluations', {
  ref: 'Answer',
  localField: 'user',
  foreignField: 'user',
});
EmployeeSchema.set('toObject', { virtuals: true });
EmployeeSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});
export interface EmployeeDocument
  extends InferSchemaType<typeof EmployeeSchema> {
  // We alias the the answers because they're actually the evaluation important data to the report
  evaluations?: Types.DocumentArray<AnswerDocument>;
}
export const EmployeeModel = model<EmployeeDocument>(
  'Employee',
  EmployeeSchema
);
