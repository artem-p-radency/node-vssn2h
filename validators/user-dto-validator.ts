import { object, string } from 'joi';

const specialCharacters = [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[','\\', ']', '^', '_', '`', '{', '|', '}', '~'];

enum CustomValidationErrors {
  PASSWORD_LOWERCASE_LETTER = 'PASSWORD_LOWERCASE_LETTER',
  PASSWORD_UPPERCASE_LETTER = 'PASSWORD_UPPERCASE_LETTER',
  PASSWORD_SPECIAL_CHARACTER = 'PASSWORD_SPECIAL_CHARACTER',
}

export const UserDtoValidator = object({
  username: string().min(3).max(24).required(),

  email: string().email().required(),

  type: string().valid('user', 'admin').required(),

  password: string()
    .min(5)
    .max(24)
    .custom((value: string, helper) => {
      if (!value.split('').some((char) => char.match(/[a-z]/))) {
        return helper.error(CustomValidationErrors.PASSWORD_LOWERCASE_LETTER);
      }
      if (!value.split('').some((char) => char.match(/[A-Z]/))) {
        return helper.error(CustomValidationErrors.PASSWORD_UPPERCASE_LETTER);
      }
      if (!value.split('').some((char) => specialCharacters.includes(char))) {
        return helper.error(CustomValidationErrors.PASSWORD_SPECIAL_CHARACTER);
      }
      return value;
    })
    .messages({
      [CustomValidationErrors.PASSWORD_LOWERCASE_LETTER]: 'Password must contain at least one lowercase letter',
      [CustomValidationErrors.PASSWORD_UPPERCASE_LETTER]: 'Password must contain at least one uppercase letter',
      [CustomValidationErrors.PASSWORD_SPECIAL_CHARACTER]: 'Password must contain at least one special character',
    })
    // .pattern(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-\.\/:;<=>?@\[\\\]^_`{|}~])[A-Za-z\d@ !"#$%&'()*+,\-\.\/:;<=>?@\[\\\]^_`{|}~]+$/
    // ),
});

// Validate user object using joi
// - username (required, min 3, max 24 characters)
// - email (required, valid email address)
// - type (required, select dropdown with either 'user' or 'admin')
// - password (required, min 5, max 24 characters, upper and lower case, at least one special character)
