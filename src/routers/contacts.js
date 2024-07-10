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
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', validateInputId, ctrlWrapper(getContactByIdController));

router.post('/', validateBody(contactInsertionValidationSchema), ctrlWrapper(createContactController));

router.patch('/:id', validateInputId, validateBody(contactUpdationValidationSchema), ctrlWrapper(patchContactController));

router.delete('/:id', validateInputId, ctrlWrapper(deleteContactController));

export default router;
