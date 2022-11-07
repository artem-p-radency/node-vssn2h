import { Router } from 'express';
import * as userController from '../controllers/users-controller';
const router = Router();

router.get('/register', userController.register);

router.post('/login', userController.login);

export default router;
