"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
exports.hashPassword = (password) => bcrypt.hash(password, 10);
exports.checkPassword = (password, hash) => bcrypt.compare(password, hash);
//# sourceMappingURL=passwordHasher.helper.js.map