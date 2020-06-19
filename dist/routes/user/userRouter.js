"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("../../controller/user");
const middleware_1 = require("../../middleware");
const router = express_1.Router();
router.post('/', middleware_1.checkIsExistEmailMiddleware, user_1.userController.createUser);
router.post('/confirm', user_1.userController.confirmUser);
exports.userRouter = router;
//# sourceMappingURL=userRouter.js.map