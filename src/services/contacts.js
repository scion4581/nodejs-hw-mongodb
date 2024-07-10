import { Contact } from '../db/models/contacts.js';
import { CONTACT_DEFAULT_SORT_FIELD } from '../constants/contacts.js';
import { ASC_SORT_DIRECTION } from '../constants/app.js';
import calcPaginationData from '../utils/calcPaginationData.js';

export const getAllContacts = async ({filter, page, perPage, sortBy = CONTACT_DEFAULT_SORT_FIELD, sortOrder = ASC_SORT_DIRECTION}) => {

  const skip = (page - 1) * perPage;
  const dbQuery = Contact.find();

  if(filter.type) {
    dbQuery.where('contactType').equals(filter.type);
  }
  if(filter.isFavourite) {
    dbQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if(filter.userId) {
    dbQuery.where('userId').equals(filter.userId);
  }

  const totalContactsCount = await Contact.find().merge(dbQuery).countDocuments();
  const contacts = await dbQuery.skip(skip).limit(perPage).sort({[sortBy]: sortOrder});

  const {totalPages, hasNextPage, hasPrevPage} = calcPaginationData({total: totalContactsCount, perPage, page});

  return {
    data: contacts,
    totalItems: totalContactsCount,
    page,
    perPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
  }
};

export const getOneContactBy = async (where) => {
  return Contact.findOne(where);
};

export const createContact = async (payload) => {
  return Contact.create(payload);
};

export const updateContact = async (where, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    where,
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (where) => {
  return Contact.findOneAndDelete(where);
};
