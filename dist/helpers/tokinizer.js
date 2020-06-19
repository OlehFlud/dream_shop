"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokinizer = void 0;
const jwt = require("jsonwebtoken");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const config_1 = require("../config");
exports.tokinizer = (action) => {
    let access_token = '';
    const refresh_token = '';
    switch (action) {
        case constants_1.ActionEnum.USER_REGISTER:
            access_token = jwt.sign({}, config_1.config.JWT_CONFIRM_EMAIL_SECRET, { expiresIn: config_1.config.JWT_CONFIRM_EMAIL_LIFETIME });
            break;
        default:
            throw new errors_1.ErrorHandler(500, 'wrong action');
    }
    return {
        access_token,
        refresh_token
    };
};
//# sourceMappingURL=tokinizer.js.map