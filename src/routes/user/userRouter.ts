import {Router} from 'express';
import {userController} from '../../controller/user';
import {checkIsExistEmailMiddleware} from '../../middleware';

const router = Router();

router.post('/',checkIsExistEmailMiddleware, userController.createUser);

export const userRouter = router;
