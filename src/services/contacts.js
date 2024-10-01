import ContactCollection from '../models/contact.js';
import calculatePaginationData from '../utilits/calculatePagination.js';
import { SORT_ORDER } from '../constant/java.js';

export const getContacts = async ({
  perPage,
  page,
  sortBy = '_id',
  sortOrder = SORT_ORDER[0],
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const contactQuery = ContactCollection.find();

  if (filter.isFavourite !== undefined) {
    contactQuery.where('isFavourite').eq(filter.isFavourite);
  }
  if (filter.type) {
    contactQuery.where('contactType').eq(filter.type);
  }
  if (filter.userId) {
    contactQuery.where('userId').eq(filter.userId);
  }

  const count = await ContactCollection.find()
    .merge(contactQuery)
    .countDocuments();

  const contacts = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calculatePaginationData({ count, perPage, page });

  return {
    data: contacts,
    page,
    perPage,
    totalItems: count,
    ...paginationData,
  };
};

export const getContact = async (filter) => {
  const contact = await ContactCollection.findById(filter);
  return contact;
};

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject?.upserted),
  };
};

export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);




