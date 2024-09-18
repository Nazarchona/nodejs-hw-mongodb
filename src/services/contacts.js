import { ContactCollection } from '../models/contact.js';

// Отримання всіх контактів
export const getAllContacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
};

// Отримання контакту за ID
export const getContactById = async (contactId) => {
  const contact = await ContactCollection.findById(contactId);
  return contact;
};

// Створення нового контакту
export const createContact = async (data) => {
  const newContact = await ContactCollection.create(data);
  return newContact;
};

// Оновлення існуючого контакту
export const updateContact = async (contactId, data) => {
  const updatedContact = await ContactCollection.findByIdAndUpdate(contactId, data, { new: true });
  return updatedContact;
};

// Видалення контакту
export const deleteContact = async (contactId) => {
  const deletedContact = await ContactCollection.findByIdAndRemove(contactId);
  return deletedContact;
};




