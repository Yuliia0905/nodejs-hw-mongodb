import express, { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIDController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';

import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIDController));

router.post(
  '/',
  jsonParser,
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.patch(
  '/:contactId',
  isValidId,
  jsonParser,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

export default router;
