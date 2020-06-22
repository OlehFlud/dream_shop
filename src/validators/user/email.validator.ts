import * as Joi from 'joi';

import {regexp} from '../../constants';

export const emailValidator = Joi.object({
  email: Joi.string().trim().regex(regexp.email).required()
});
