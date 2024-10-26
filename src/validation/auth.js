import Joi from 'joi';

const baseMessages = {
  'string.base': '"{{#label}}" should be a string',
  'string.empty': '"{{#label}}" cannot be empty',
  'any.required': '"{{#label}}" is a required field',
};

export const registerUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      ...baseMessages,
      'string.min': '"name" should have at least {#limit} characters',
      'string.max': '"name" cannot exceed {#limit} characters',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      ...baseMessages,
      'string.email': '"email" must be a valid email',
    }),
  password: Joi.string().required().messages(baseMessages),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      ...baseMessages,
      'string.email': '"email" must be a valid email',
    }),
  password: Joi.string().required().messages(baseMessages),
});
