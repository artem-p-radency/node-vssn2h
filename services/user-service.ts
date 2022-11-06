import { UserDto } from '../models/user-dto';
import * as userRepository from '.././repositories/users-repository';
import { UserEntry } from '../models/user-entry';
const bcrypt = require('bcryptjs');

export const register = (userDto: UserDto): boolean => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userDto.password, salt);
  const userEntry: UserEntry = {
    email: userDto.email,
    type: userDto.type,
    salt,
    passwordhash: hash,
  };
  return userRepository.insertUser(userDto.username, userEntry);
};

export const login = (username: string, password: string): boolean => {
  const user = userRepository.getUserByUsername(username);
  if (!user) {
    return false;
  }
  return bcrypt.compareSync(password, user.passwordhash);
};
