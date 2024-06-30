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

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
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

export const deleteContact = async (contactId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};
