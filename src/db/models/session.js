import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    accessToken: {
      type: String,
      required: false,
      unique: true,
    },
    refreshToken: {
      type: String,
      required: false,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Session = model('session', sessionSchema);
