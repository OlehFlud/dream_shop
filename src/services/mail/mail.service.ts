import * as EmailTemplates from 'email-templates';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

import {ActionEnum, ResponceStatusCodeEnum} from '../../constants';
import {htmlTemplate} from '../../emailTemplates';
import {config} from '../../config';
import {ErrorHandler} from '../../errors';

if (
  !config.FRONTEND_URL
    || !config.ROOT_EMAIL_SERVICE
    || !config.ROOT_EMAIL
    || !config.ROOT_EMAIL_PASSWORD
) {
  throw new Error('email credentials are not defined!');
}
const contextExtention = {
  frontendUrl: config.FRONTEND_URL
};

const transporter = nodemailer.createTransport({
  service: config.ROOT_EMAIL_SERVICE,
  auth: {
    user: config.ROOT_EMAIL,
    pass: config.ROOT_EMAIL_PASSWORD
  }
});

const emailTemplates = new EmailTemplates({
  message: {},
  views: {
    root: path.resolve(__dirname, '../../', 'emailTemplates')
  }
});

export class MailService {
  async sendEmail(email: string, action: ActionEnum, context: any = {}): Promise<any> {
    const templateInfo = htmlTemplate[action];

    if (!templateInfo) {
      throw new ErrorHandler(ResponceStatusCodeEnum.SERVER, 'template not found');
    }
    Object.assign(context, contextExtention);

    const html = await emailTemplates.render(templateInfo.templateFileName, context);

    await transporter.sendMail({
      from: `No reply <${config.ROOT_EMAIL}> `,
      to: email,
      subject: templateInfo.subject,
      html
    });
  }
}

export const emailService = new MailService();
