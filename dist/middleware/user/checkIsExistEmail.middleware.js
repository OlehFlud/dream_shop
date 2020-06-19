"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsExistEmailMiddleware = void 0;
const services_1 = require("../../services");
const errors_1 = require("../../errors");
exports.checkIsExistEmailMiddleware = async (req, res, next) => {
    const { email } = req.body;
    const userByEmail = await services_1.userService.findOneByParams({ email });
    if (userByEmail) {
        return next(new errors_1.ErrorHandler(400, errors_1.customErrors.BAD_REQUEST_USER_PRESENT.message, errors_1.customErrors.BAD_REQUEST_USER_PRESENT.code));
    }
    next();
};
//# sourceMappingURL=checkIsExistEmail.middleware.js.map