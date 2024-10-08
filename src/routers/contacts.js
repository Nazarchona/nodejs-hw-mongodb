import { Router } from 'express';
import {
  getContactController,
  getContactsController,
  addContactController,
  upsertContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import authenticate from '../middlewares/autenticate.js';
import isValidId from '../middlewares/isValidId.js';
import upload from '../middlewares/multer.js';
import validateBody from '../middlewares/validateBody.js';
import ctrlWrapper from '../utilits/ctrlWrapper.js';
import {
  contactAddSchema,
  contactPatchSchema,
} from '../validation/contactValidation.js';

const contactsRouter = Router();
contactsRouter.use(authenticate);
contactsRouter.get('/', ctrlWrapper(getContactsController));
contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactController));
contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(upsertContactController),
);

contactsRouter.patch(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(contactPatchSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;

