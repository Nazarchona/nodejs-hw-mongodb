import express from 'express';
import {
  getContactsController,
  getContactController,
  addContactController,  // Імпортуємо контролер для створення контакту
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utilits/ctrlWrapper.js';

const router = express.Router();

// Отримати всі контакти
router.get('/', ctrlWrapper(getContactsController));

// Отримати контакт за ID
router.get('/:contactId', ctrlWrapper(getContactController));

// Створити новий контакт
router.post('/', ctrlWrapper(addContactController));

// Оновити контакт за ID
router.patch('/:contactId', ctrlWrapper(patchContactController));

// Видалити контакт за ID
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;


