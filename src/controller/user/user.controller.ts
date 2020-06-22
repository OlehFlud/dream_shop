import {NextFunction, Request, Response} from 'express';

import {ActionEnum, HistoryEnum, RequestHeadersEnum, ResponceStatusCodeEnum, UserStatusEnum} from '../../constants';
import {hashPassword, tokinizer} from '../../helpers';
import {emailService, historyService, userService} from '../../services';
import {IRequestExtended, IUser} from '../../models';
import {customErrors, ErrorHandler} from '../../errors';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body as IUser;

    user.password = await hashPassword(user.password);

    const {_id} = await userService.createUser(user);

    const {access_token} = tokinizer(ActionEnum.USER_REGISTER);

    await userService.addActionToken(_id, {action: ActionEnum.USER_REGISTER, token: access_token});
    await emailService.sendEmail(user.email, ActionEnum.USER_REGISTER, {token: access_token});
    await historyService.createHistory({event: HistoryEnum.USER_REGISTERED, userId: _id});

    res.sendStatus(ResponceStatusCodeEnum.CREATED);
  }
  async confirmUser(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id, status, tokens = []} = req.user as IUser;
    const tokenToDelete = req.get(RequestHeadersEnum.AUTHORIZATION);

    if (status !== UserStatusEnum.PENDING) {
      return next(
        new ErrorHandler(
          ResponceStatusCodeEnum.BAD_REQUEST,
          customErrors.BAD_REQUEST_USER_ALREADY_ACTIVATED.message,
          customErrors.BAD_REQUEST_USER_ALREADY_ACTIVATED.code)
      );
    }

    await userService.updateUserByParams({_id}, {status: UserStatusEnum.CONFIRMED});

    const index = tokens?.findIndex(({action, token}) => {
      return token === tokenToDelete && action === ActionEnum.USER_REGISTER;
    });

    if (index !== -1) {
      tokens.splice(index,1);
      await userService.updateUserByParams({_id}, {tokens} as Partial<IUser>);
      // await userService.removeActionToken(ActionEnum.USER_REGISTER, )

    }
    await historyService.createHistory({event: HistoryEnum.USER_CONFIRMED, userId: _id});

    res.end();
  }

  async forgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {

    const {email, _id} = req.user as IUser;
    const {access_token} = tokinizer(ActionEnum.FORGOT_PASSWORD);

    await userService.addActionToken(_id,{token: access_token, action: ActionEnum.FORGOT_PASSWORD});
    await emailService.sendEmail(email, ActionEnum.FORGOT_PASSWORD, {token : access_token});

    res.end();
  }

  async setForgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
    const {_id, tokens = []} = req.user as IUser;
    const {password} = req.body;
    const tokenToDelete = req.get(RequestHeadersEnum.AUTHORIZATION);
    const hashPass = await hashPassword(password);

    await userService.updateUserByParams({_id}, {password: hashPass});

    const index = tokens?.findIndex(({action, token}) => {
      return token === tokenToDelete && action === ActionEnum.FORGOT_PASSWORD;
    });

    if (index !== -1) {
      tokens.splice(index, 1);

      await userService.updateUserByParams({_id}, {tokens} as Partial<IUser>);
    }
    res.end();
  }
}

export const userController = new UserController();
