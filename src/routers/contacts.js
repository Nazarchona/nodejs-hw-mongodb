import { Router } from 'express';
import {
  getContactController,
  getContactsController,
  addContactController,
  upsertContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import isValidId from '../middlewares/isValidId.js';
import validateBody from '../middlewares/validateBody.js';
import ctrlWrapper from '../utilits/ctrlWrapper.js';


import {
  contactAddSchema,
  contactPatchSchema,
} from '../validation/contactValidation.js';

const router = Router();


router.get('/', ctrlWrapper(getContactsController));

router.get('/:id', isValidId, ctrlWrapper(getContactController));


router.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);


router.put(
  '/:id',
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(upsertContactController),
);


router.patch(
  '/:id',
  isValidId,
  validateBody(contactPatchSchema),
  ctrlWrapper(patchContactController),
);



router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));


export default router;


