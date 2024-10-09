import Joi from 'joi';

import { contactTypeList } from '../constant/contacts.js';


export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20),
  age: Joi.number().integer().min(6).max(16).optional(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...contactTypeList)
    .required(),
});


export const contactPatchSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20),
  age: Joi.number().integer().min(6).max(16).optional(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
}).min(1);
