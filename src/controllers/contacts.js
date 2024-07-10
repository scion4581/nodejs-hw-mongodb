import createHttpError from 'http-errors';
import { createContact, deleteContact, getAllContacts, getOneContactBy, updateContact } from '../services/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { CONTACT_FIELDS_LIST } from '../constants/contacts.js';
import parseContactsFilterParams from '../utils/parseContactsFilterParams.js';

export const getContactsController = async (req, res) => {

  const queryParams = req.query;
  const {page, perPage} = parsePaginationParams(queryParams);
  const {sortBy, sortOrder} = parseSortParams(queryParams, CONTACT_FIELDS_LIST);
  const filter = {
    ...parseContactsFilterParams(queryParams),
    ...{ userId: req.user._id },
  };

  const contactsResult = await getAllContacts({
    filter,
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.status(200).json({
    status: 200,
    message: contactsResult?.data?.length ? 'Successfully found contacts!':'There is an empty contacts list',
    data: contactsResult
  });
};

export const getContactByIdController = async (req, res, next) => {
  const where = getByWhere(req);
  let contact = null;
  try {
    contact = await getOneContactBy(where);
  } catch (err){
    next(createHttpError(500, err.message));
    return;
  }

  if(!contact){
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${where._id}!`,
    data: contact
  });

};

export const createContactController = async (req, res) => {
  const contactData = {
    ...req.body,
    ...{ userId: req.user._id },
  };
  const contact = await createContact(contactData);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
}

export const patchContactController = async (req, res, next) => {

  const result = await updateContact(getByWhere(req), req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {

  const contact = await deleteContact(getByWhere(req));

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

const getByWhere = (req) => ({
    _id: req.params.id,
    userId: req.user._id
});


