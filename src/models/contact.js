import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;
import { contactTypeList } from '../constant/contacts.js';
import { handleSaveError, setUpdateOptions } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      default: '',
    },
    isFavourite: {
      type: Boolean,
      required: false,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: contactTypeList,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

contactSchema.post('save', handleSaveError);
contactSchema.pre('findOneAndUpdate', setUpdateOptions);
contactSchema.post('findOneAndUpdate', handleSaveError);

// Перевірка, чи модель вже існує
const ContactCollection = models.contact || model('contact', contactSchema);

export const sortFields = ['name'];
export default ContactCollection;


