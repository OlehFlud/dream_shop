"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = exports.MailService = void 0;
const EmailTemplates = require("email-templates");
const nodemailer = require("nodemailer");
const path = require("path");
const emailTemplates_1 = require("../../emailTemplates");
const config_1 = require("../../config");
const errors_1 = require("../../errors");
if (!config_1.config.FRONTEND_URL
    || !config_1.config.ROOT_EMAIL_SERVICE
    || !config_1.config.ROOT_EMAIL
    || !config_1.config.ROOT_EMAIL_PASSWORD) {
    throw new Error('email credentials are not defined!');
}
const contextExtention = {
    frontendUrl: config_1.config.FRONTEND_URL
};
const transporter = nodemailer.createTransport({
    service: config_1.config.ROOT_EMAIL_SERVICE,
    auth: {
        user: config_1.config.ROOT_EMAIL,
        pass: config_1.config.ROOT_EMAIL_PASSWORD
    }
});
const emailTemplates = new EmailTemplates({
    message: {},
    views: {
        root: path.resolve(__dirname, '../../', 'emailTemplates')
    }
});
class MailService {
    async sendEmail(email, action, context = {}) {
        const templateInfo = emailTemplates_1.htmlTemplate[action];
        if (!templateInfo) {
            throw new errors_1.ErrorHandler(500, 'template not found');
        }
        Object.assign(context, contextExtention);
        const html = await emailTemplates.render(templateInfo.templateFileName, context);
        await transporter.sendMail({
            from: `No reply <${config_1.config.ROOT_EMAIL}> `,
            to: email,
            subject: templateInfo.subject,
            html
        });
    }
}
exports.MailService = MailService;
exports.emailService = new MailService();
//# sourceMappingURL=mail.service.js.map