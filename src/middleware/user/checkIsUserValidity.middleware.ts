import * as Joi from 'joi';
import {newUserValidator} from '../../validators';
import {IUser} from '../../models';
import {NextFunction, Request, Response} from 'express';

export const checkIsUserValidityMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const user = req.body as IUser;

  const {error} = Joi.validate(user, newUserValidator);

  if (error) {
    return next(new Error(error.details[0].message));
  }

  next();
};
