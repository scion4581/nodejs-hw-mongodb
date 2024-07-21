import Joi from 'joi';

export const registerUserValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const sendEmailValidationSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordValidationSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
