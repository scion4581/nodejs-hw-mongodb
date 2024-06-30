import { model, Schema } from 'mongoose';
import { CONTACT_TYPE_PERSONAL, CONTACT_TYPES } from '../../constants/contacts.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      required: true,
      default: false
    },
    contactType: {
      type: String,
      required: true,
      enum: CONTACT_TYPES,
      default: CONTACT_TYPE_PERSONAL
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Contact = model('contact', contactsSchema);
