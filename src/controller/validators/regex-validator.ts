export const DATE_REGEX = new RegExp('^(19[7-9][0-9]|20[0-4][0-9]|2050)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$')

export const ONLY_NUMBERS_REGEX = new RegExp('^[0-9]+$');

export const PASSWORD_REGEX = new RegExp('^[a-zA-Z0-9]{3,30}$')

export const MONGODB_ID = new RegExp('^[0-9a-fA-F]{24}$')