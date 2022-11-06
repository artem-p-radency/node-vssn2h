import { Request, Response, NextFunction, Router } from 'express';
import * as userController from '../controllers/users-controller';
const router = Router();

// Request body -> UserDto
router.get('/register', (req: Request, res: Response, next: NextFunction) => {
  userController.register(req, res);
  // Validate user object using joi
  // - username (required, min 3, max 24 characters)
  // - email (required, valid email address)
  // - type (required, select dropdown with either 'user' or 'admin')
  // - password (required, min 5, max 24 characters, upper and lower case, at least one special character)
});

// Request body -> { username: string, password: string }
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  userController.login(req, res);
  // Return 200 if username and password match
  // Return 401 else
});

export default router;
