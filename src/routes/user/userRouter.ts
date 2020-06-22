import {Router} from 'express';
import {userController} from '../../controller/user';
import {
  checkConfirmTokenMiddleware, checkForgotPasswordTokenMiddleware,
  checkIsExistEmailMiddleware,
  checkIsUserExistMiddleware,
  checkIsUserValidityMiddleware,
  emailValidatorMiddleware,
  singlePasswordMiddleware
} from '../../middleware';

const router = Router();

router.post('/',checkIsUserValidityMiddleware,checkIsExistEmailMiddleware, userController.createUser);
router.post('/confirm',checkConfirmTokenMiddleware, userController.confirmUser);
router.post('/password/forgot',emailValidatorMiddleware,checkIsUserExistMiddleware, userController.forgotPassword);
router.post('/password/reset',singlePasswordMiddleware,checkForgotPasswordTokenMiddleware, userController.setForgotPassword);

export const userRouter = router;
