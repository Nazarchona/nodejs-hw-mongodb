import createHttpError from 'http-errors';
import {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

import parsePaginationParams from '../utilits/parsPagination.js';
import parseSortParams from '../utilits/parsSort.js';
import parseContactFilterParams from '../utilits/filter/parsFilter.js';

import { sortFields } from '../models/contact.js';

import saveFileToUploadDir from '../utilits/saveFileToUploadDir.js';
import saveFileToCloudinary from '../utilits/saveFileToCloudinary.js';
import { env } from '../utilits/env.js';

const enableCloudinary = env('ENABLE_CLOUDINARY');

export const getContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseContactFilterParams(req.query);

  const { _id: userId } = req.user;
  console.log(req.user);

  const data = await getContacts({
    perPage,
    page,
    sortBy,
    sortOrder,
    filter: { ...filter, userId },
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await getContact({ _id: id, userId });

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
  const { _id: userId } = req.user;
  const data = await addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  let photo;
  if (req.file) {
    if (enableCloudinary === 'true') {
      photo = await saveFileToCloudinary(req.file, 'photo');
    } else {
      photo = await saveFileToUploadDir(req.file);
    }
  }
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { isNew, data } = await updateContact({ _id: id, userId, photo }, req.body, {
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
  const { _id: userId } = req.user;
  const result = await updateContact({ _id: id, userId }, req.body);

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
  const { _id: userId } = req.user;
  const data = await deleteContact({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send();
};



