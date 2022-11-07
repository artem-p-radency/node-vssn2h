import { UserEntry } from '.././models/user-entry';

// Database mock where the username is the primary key of a user.
const MEMORY_DB: Record<string, UserEntry> = {};

export const getUserByUsername = async (name: string): Promise<UserEntry | undefined> => {
  return MEMORY_DB[name];
};

export const getUserByEmail = async (email: string): Promise<UserEntry | undefined> => {
  const values: UserEntry[] = Object.values(MEMORY_DB.values);
  return values.find((u) => u.email == email);
};

export const insertUser = async (username: string, user: UserEntry): Promise<boolean> => {
  if (MEMORY_DB[username]) {
    return false;
  }
  MEMORY_DB[username] = user;
  return true;
};
