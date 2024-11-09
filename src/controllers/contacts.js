import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { handlePhotoUpload } from '../utils/handleUploadPhoto.js';

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIDController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id.toString();

  const contact = await getContactById(contactId, userId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  if (!name || !phoneNumber) {
    throw createHttpError(
      400,
      'Missing required fields: name, phoneNumber are required.',
    );
  }

  const photoUrl = await handlePhotoUpload(req.file);

  const contact = await createContact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
    userId: req.user._id,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact({ _id: contactId, userId: req.user._id });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
  // res.status(204).end();
  // res.sendStatus(204)
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id.toString();

  const photoUrl = await handlePhotoUpload(req.file);

  const newData = {
    ...req.body,
    photo: photoUrl,
  };

  const result = await updateContact(contactId, userId, newData);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};
