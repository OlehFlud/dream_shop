import * as Joi from 'joi';

import {regexp} from '../../constants';

export const singlePasswordValidator = Joi.object({
  password: Joi.string().trim().regex(regexp.password).required()
});
