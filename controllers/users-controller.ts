import { UserDto } from '../models/user-dto';
import * as userService from '../services/user-service';
import { Request, Response } from 'express';
import { UserDtoValidator } from '../validators/user-dto-validator';

export const register = (req: Request, res: Response) => {
  const validationResuts = UserDtoValidator.validate(req.body);

  if (validationResuts.error) {
    res.status(400);
    res.send(validationResuts.error);
    return;
  }
  const userDto: UserDto = validationResuts.value;
  const success = userService.register(userDto);
  if (success) {
    res.status(200);
    res.send('User has been registered succesfully');
  } else {
    res.status(409);
    res.send('User with this username has already been registered');
  }
};

export const login = (req: Request, res: Response) => {
  const loginSuccess = userService.login(req.body.username, req.body.password);
  if (loginSuccess) {
    res.status(200);
    res.send('Successfully loggined');
  } else {
    res.status(401);
    res.send('Invalid username or password');
  }
};

// // Request body -> UserDto
// router.get('/register', (req: Request, res: Response, next: NextFunction) => {
//   // Validate user object using joi
//   // - username (required, min 3, max 24 characters)
//   // - email (required, valid email address)
//   // - type (required, select dropdown with either 'user' or 'admin')
//   // - password (required, min 5, max 24 characters, upper and lower case, at least one special character)
// });

// // Request body -> { username: string, password: string }
// router.post('/login', (req: Request, res: Response, next: NextFunction) => {
//   // Return 200 if username and password match
//   // Return 401 else
// });
