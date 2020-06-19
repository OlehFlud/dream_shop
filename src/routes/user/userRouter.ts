import {Router} from 'express';
import {userController} from '../../controller/user';
import {checkIsExistEmailMiddleware} from '../../middleware';

const router = Router();

router.post('/',checkIsExistEmailMiddleware, userController.createUser);
router.post('/confirm', userController.confirmUser);

export const userRouter = router;
