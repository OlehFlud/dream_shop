"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUserValidator = void 0;
const Joi = require("joi");
const constants_1 = require("../../constants");
exports.newUserValidator = Joi.object({
    age: Joi.number().integer().min(1).max(120).required(),
    email: Joi.string().trim().regex(constants_1.regexp.email).required(),
    gender: Joi.string().trim().allow('male', 'female').required(),
    name: Joi.string().trim().alphanum().min(2).max(60).required(),
    password: Joi.string().trim().regex(constants_1.regexp.password).required(),
    phone: Joi.string().regex(constants_1.regexp.phone).trim(),
    surname: Joi.string().trim().alphanum().min(2).max(60).required()
});
//# sourceMappingURL=newUserValidator.js.map