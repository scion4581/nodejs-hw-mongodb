import Joi from 'joi';

import { CONTACT_TYPES } from '../constants/contacts.js';

const stringValidationSchema = Joi.string().min(3).max(30);
const contactTypeValidationSchema = stringValidationSchema.valid(...CONTACT_TYPES);
const contactEmailValidationSchema = stringValidationSchema.email();
const contactIsFavouriteValidationSchema = Joi.boolean();

export const contactInsertionValidationSchema = Joi.object({
  name: stringValidationSchema.required(),
  phoneNumber: stringValidationSchema.required(),
  email: contactEmailValidationSchema,
  contactType: contactTypeValidationSchema,
  isFavourite: contactIsFavouriteValidationSchema,
});

export const contactUpdationValidationSchema = Joi.object({
  name: stringValidationSchema,
  phoneNumber: stringValidationSchema,
  email: contactEmailValidationSchema,
  contactType: contactTypeValidationSchema,
  isFavourite: contactIsFavouriteValidationSchema,
})
