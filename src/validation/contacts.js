import Joi from 'joi';

const commonStringMessages = {
  'string.base': 'Should be a string',
  'string.min': 'Should have at least {#limit} characters',
  'string.max': 'Should have at most {#limit} characters',
};

export const createContactsSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      ...commonStringMessages,
      'any.required': 'Contact name is required',
    }),
  phoneNumber: Joi.string()
    .min(6)
    .max(15)
    .required()
    .messages({
      ...commonStringMessages,
      'any.required': 'Phone number is required',
    }),
  email: Joi.string().email().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email must be a valid email address',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'Contact type should be a string',
    'any.only': 'Contact type must be one of [work, home, personal]',
  }),
  userId: Joi.string().required(),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages(commonStringMessages),
  phoneNumber: Joi.string().min(6).max(15).messages(commonStringMessages),
  email: Joi.string().email().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email must be a valid email address',
  }),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'Contact type should be a string',
    'any.only': 'Contact type must be one of [work, home, personal]',
  }),
});
