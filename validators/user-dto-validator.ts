import { object, string } from 'joi';

export const UserDtoValidator = object({
  username: string().min(3).max(24).required(),

  email: string().email().required(),

  type: string().valid('user', 'admin').required(),

  password: string()
    .min(5)
    .max(24)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-\.\/:;<=>?@\[\\\]^_`{|}~])[A-Za-z\d@ !"#$%&'()*+,\-\.\/:;<=>?@\[\\\]^_`{|}~]+$/
    ),
});

// Validate user object using joi
// - username (required, min 3, max 24 characters)
// - email (required, valid email address)
// - type (required, select dropdown with either 'user' or 'admin')
// - password (required, min 5, max 24 characters, upper and lower case, at least one special character)
