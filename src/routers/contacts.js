import { Router } from 'express';

import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactInsertionValidationSchema, contactUpdationValidationSchema } from '../validation/contacts.js';
import validateInputId from '../middlewares/validateInputId.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:id', validateInputId, ctrlWrapper(getContactByIdController));

router.post('/contacts', validateBody(contactInsertionValidationSchema), ctrlWrapper(createContactController));

router.patch('/contacts/:id', validateInputId, validateBody(contactUpdationValidationSchema), ctrlWrapper(patchContactController));

router.delete('/contacts/:id', validateInputId, ctrlWrapper(deleteContactController));

export default router;
