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
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', validateInputId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  upload.single('photo'),
  validateBody(contactInsertionValidationSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:id',
  upload.single('photo'),
  validateInputId,
  validateBody(contactUpdationValidationSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/:id', validateInputId, ctrlWrapper(deleteContactController));

export default router;
