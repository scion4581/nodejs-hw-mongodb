import createHttpError from 'http-errors';
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from '../services/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { CONTACT_FIELDS_LIST } from '../constants/contacts.js';
import parseContactsFilterParams from '../utils/parseContactsFilterParams.js';

export const getContactsController = async (req, res) => {

  const queryParams = req.query;
  const {page, perPage} = parsePaginationParams(queryParams);
  const {sortBy, sortOrder} = parseSortParams(queryParams, CONTACT_FIELDS_LIST);
  const filter = parseContactsFilterParams(queryParams);

  const contacts = await getAllContacts({
    filter,
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.status(200).json({
    status: 200,
    message: contacts?.length ? 'Successfully found contacts!':'There is an empty contacts list',
    data: contacts
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;

  let contact = null;
  try {
    contact = await getContactById(id);
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
    message: `Successfully found contact with id ${id}!`,
    data: contact
  });

};

export const createContactController = async (req, res) => {


  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
}

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body);

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

  const { id } = req.params;
  const contact = await deleteContact(id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};



