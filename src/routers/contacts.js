import express, { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIDConrtoller,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIDConrtoller));
router.post('/', jsonParser, ctrlWrapper(createContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.patch('/:contactId', jsonParser, ctrlWrapper(patchContactController));

export default router;
