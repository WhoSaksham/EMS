export const PAGE_NOT_ACCESSIBLE = 'You cannot access this page';
export const LOCATION_REQUIRED = "Please enter Location";
export const EMAIL_REQUIRED = "Please enter the email";
export const INCORRECT_EMAIL = "The email must be a valid email address";
export const PASSWORD_REQUIRED = "Please enter the password";
export const INVALID_PASSWORD = "Password should be of at least 6 characters";
export const NAME_REQUIRED = name => `Please enter ${name || ''} Name`;
export const maximumLengthAllowed = (length, value) => `Maximum ${length} ${value ?? "Characters"} Allowed`;

