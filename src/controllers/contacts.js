import createHttpError from 'http-errors';

import {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

import parsePaginationParams from '../utilits/parsPagination.js';
import parseSortParams from '../utilits/parsSort.js';
import parseContactFilterParams from '../utilits/filter/parsFilter.js';
import { sortFields } from '../models/contact.js';


export const getContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseContactFilterParams(req.query);

  const data = await getContacts({ perPage, page, sortBy, sortOrder, filter });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};


export const getContactController = async (req, res) => {
  const { id } = req.params;
  const data = await getContactById(id);

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id=${id}!`,
    data,
  });
};


export const addContactController = async (req, res) => {
  const data = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};


export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { isNew, data } = await updateContact({ _id: id }, req.body, {
    upsert: true,
  });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Contact upsert successfully`,
    data,
  });
};


export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const result = await updateContact({ _id: id }, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};


export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteContact({ _id: id });

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send();
};



