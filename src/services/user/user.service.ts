import {UserModel} from '../../dataBase';
import {IUser, IUserToken} from '../../models';
import {Types} from 'mongoose';

class UserService {
  createUser(user: Partial<IUser>): Promise<IUser> {
    const userToCreate = new UserModel(user);

    return userToCreate.save();
  }

  addActionToken(id: string, tokenObject: IUserToken): Promise<IUser> {
    return UserModel.update(
      {_id: Types.ObjectId(id)},
      {
        $push: {
          tokens: tokenObject as any
        }
      }
    ) as any;
  }

  findOneByParams(findObject: Partial<IUser>): Promise<IUser>| null {
    return UserModel.findOne(findObject) as any;
  }
}

export const userService = new UserService();
