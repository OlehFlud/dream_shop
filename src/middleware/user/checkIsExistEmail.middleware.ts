import {NextFunction, Request, Response} from 'express';
import {userService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponceStatusCodeEnum} from '../../constants';

export const checkIsExistEmailMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {

  const {email} = req.body;
  const userByEmail = await userService.findOneByParams({email});

  if (userByEmail) {
    return next(new ErrorHandler(
      ResponceStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_USER_PRESENT.message,
      customErrors.BAD_REQUEST_USER_PRESENT.code));
  }
  next();
};
