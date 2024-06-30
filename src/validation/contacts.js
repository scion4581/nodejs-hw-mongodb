import Joi from "joi";

import { CONTACT_TYPES } from '../constants/contacts.js';

export const contactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).email(),
  contactType: Joi.string().min(3).max(30).valid(...CONTACT_TYPES).required(),
  isFavourite: Joi.boolean().required(),
});
