import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

import { enumList } from '../constant/contacts.js';

import { handleSaveError } from './hooks.js';


const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name must be exist'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'phoneNumber must be exist'],
    },
    email: {
      type: String,
      required: false,
    },
    isFavorite: {
      type: Boolean,
      default: false,
      require: [true, 'isFavorite must be exist'],
    },
    contactType: {
      type: String,
      enum: enumList,
      required: [true, 'contactType must be exist'],
      default: 'personal',
    },
    photo: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post('save', handleSaveError);

// Check if the model is already registered to prevent the OverwriteModelError
const ContactCollection = models.contact || model('contact', contactSchema);

export const sortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavorite',
  'contactType',
  'createdAt',
  'updatedAt',
];

export default ContactCollection;






