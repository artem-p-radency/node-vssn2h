import { UserDto } from '../models/user-dto';
import * as userService from '../services/users-service';
import { Request, Response } from 'express';
import { UserDtoValidator } from '../validators/user-dto-validator';
import { ApiResponse } from '../models/response';

// Request body -> UserDto
// Validate user object using joi
// - username (required, min 3, max 24 characters)
// - email (required, valid email address)
// - type (required, select dropdown with either 'user' or 'admin')
// - password (required, min 5, max 24 characters, upper and lower case, at least one special character)
export const register = async (req: Request, res: Response) => {
  const validationResuts = UserDtoValidator.validate(req.body);

  if (validationResuts.error) {
    res.status(400);
    res.json(toResponse(validationResuts.error.message));
    return;
  }
  const userDto: UserDto = validationResuts.value;
  const success = await userService.register(userDto);
  if (success) {
    res.status(200);
    res.json(toResponse(undefined, { username: userDto.username }));
  } else {
    res.status(409);
    res.json(toResponse('User with this username has already been registered'));
  }
};

// Request body -> { username: string, password: string }
// Return 200 if username and password match
//Return 401 else
export const login = async (req: Request, res: Response) => {
  const loginSuccess = await userService.login(req.body.username, req.body.password);
  if (loginSuccess) {
    res.status(200);
    res.json(toResponse(undefined, { username: req.body.username }));
  } else {
    res.status(401);
    res.json(toResponse('Invalid username or password'));
  }
};

const toResponse = <T>(error?: string, data?: T): ApiResponse<T> => ({
  error, data
})