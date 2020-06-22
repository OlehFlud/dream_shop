import {ActionEnum} from '../constants';

export const htmlTemplate: {[index: string]: {subject: string, templateFileName: string}} = {
  [ActionEnum.USER_REGISTER]: {
    subject: 'Hello',
    templateFileName: 'userWelcome'
  },
  [ActionEnum.FORGOT_PASSWORD]: {
    subject: 'You forgot the password',
    templateFileName: 'forgotPassword'
  }
};
