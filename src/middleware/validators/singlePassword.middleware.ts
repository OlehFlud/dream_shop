import {NextFunction, Request, Response} from 'express';
import * as Joi from 'joi';
import {singlePasswordValidator} from '../../validators';
import {ErrorHandler} from '../../errors';
import {ResponceStatusCodeEnum} from '../../constants';

export const singlePasswordMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {error} = Joi.validate(req.body, singlePasswordValidator);

  if (error) {
    return next(new ErrorHandler(ResponceStatusCodeEnum.BAD_REQUEST, error.details[0].message));
  }

  next();
};

