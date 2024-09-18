import express from 'express';
import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from '../controllers/contacts.js';
import ctrlWrapper from '../utilits/ctrlWrapper.js';

const router = express.Router();

// Отримати всі контакти
router.get('/', ctrlWrapper(getAllContacts));

// Отримати контакт за ID
router.get('/:contactId', ctrlWrapper(getContactById));

// Створити новий контакт
router.post('/', ctrlWrapper(createContact));

// Оновити контакт за ID
router.patch('/:contactId', ctrlWrapper(updateContact));

// Видалити контакт за ID
router.delete('/:contactId', ctrlWrapper(deleteContact));

export default router;

