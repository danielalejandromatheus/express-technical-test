import { InferSchemaType, Schema, model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { ROLES } from 'src/consts/user';

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'employee', enum: ROLES },
    lastLogin: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export interface UserDocument extends InferSchemaType<typeof UserSchema> {
  comparePassword(password: string): Promise<boolean>;
}
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10);
  next();
});
UserSchema.methods.comparePassword = async function (password: string) {
  return compare(password, this.password);
};
UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});
export const UserModel = model<UserDocument>('User', UserSchema);
