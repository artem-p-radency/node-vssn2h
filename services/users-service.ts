import { UserDto } from '../models/user-dto';
import * as userRepository from '../repositories/users-repository';
import { UserEntry } from '../models/user-entry';
const bcrypt = require('bcryptjs');

export const register = async (userDto: UserDto): Promise<boolean> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(userDto.password, salt);
  const userEntry: UserEntry = {
    email: userDto.email,
    type: userDto.type,
    salt,
    passwordhash: hash,
  };
  return userRepository.insertUser(userDto.username, userEntry);
};

export const login = async (username: string, password: string): Promise<boolean> => {
  const user = await userRepository.getUserByUsername(username);
  if (!user) {
    return false;
  }
  return await bcrypt.compare(password, user.passwordhash);
};
