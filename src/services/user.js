import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';
import { hashValue } from '../utils/hash.js';

export const createUser = async (payload) => {

  const user = await User.findOne({ email: payload.email });

  if (user) throw createHttpError(409, 'Email in use');

  return User.create({
    ...payload,
    password: await hashValue(payload.password),
  });
};
