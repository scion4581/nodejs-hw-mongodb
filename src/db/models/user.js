import { model, Schema } from 'mongoose';

const userSchema = new Schema(
{
          name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: false,
            unique: true
          },
          password: {
            type: String,
            required: false,
          },
        },
  {
          timestamps: true,
          versionKey: false,
        }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};


export const User = model('user', userSchema);
