import * as Joi from 'joi';

import {regexp} from '../../constants';

export const newUserValidator = Joi.object({
  age: Joi.number().integer().min(1).max(120).required(),
  email: Joi.string().trim().regex(regexp.email).required(),
  gender: Joi.string().trim().allow('male','female').required(),
  name: Joi.string().trim().alphanum().min(2).max(60).required(),
  password: Joi.string().trim().regex(regexp.password).required(),
  phone: Joi.string().regex(regexp.phone).trim(),
  surname: Joi.string().trim().alphanum().min(2).max(60).required()
});
