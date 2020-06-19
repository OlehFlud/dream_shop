"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const dataBase_1 = require("../../dataBase");
const mongoose_1 = require("mongoose");
class UserService {
    createUser(user) {
        const userToCreate = new dataBase_1.UserModel(user);
        return userToCreate.save();
    }
    addActionToken(id, tokenObject) {
        return dataBase_1.UserModel.update({ _id: mongoose_1.Types.ObjectId(id) }, {
            $push: {
                tokens: tokenObject
            }
        });
    }
    findOneByParams(findObject) {
        return dataBase_1.UserModel.findOne(findObject);
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map