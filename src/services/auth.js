import { randomBytes } from 'crypto';
import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';
import { compareHash } from '../utils/hash.js';
import { Session } from '../db/models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/app.js';

export const loginUser = async (payload) => {

  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (!compareHash(payload.password, user.password)) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Session.deleteOne({ userId: user._id });
  const token = createToken();

  return Session.create({
    ...{ userId: user._id },
    ...token
  });
};

export const logoutUser = async (sessionId) => {
  Session.deleteOne({ _id: sessionId });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const token = createToken();

  await Session.deleteOne({ _id: sessionId, refreshToken });

  return Session.create({
    userId: session.userId,
    ...token,
  });
};


const createToken = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};
