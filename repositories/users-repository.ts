import { UserEntry } from '.././models/user-entry';

// Database mock where the username is the primary key of a user.
const MEMORY_DB: Record<string, UserEntry> = {};

export const getUserByUsername = (name: string): UserEntry | undefined => {
  return MEMORY_DB[name];
};

export const getUserByEmail = (email: string): UserEntry | undefined => {
  const values: UserEntry[] = Object.values(MEMORY_DB.values);
  return values.find((u) => u.email == email);
};

export const insertUser = (username: string, user: UserEntry): boolean => {
  if (!MEMORY_DB[username]) {
    return false;
  }
  MEMORY_DB[username] = user;
  return true;
};
