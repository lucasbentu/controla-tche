import Joi from 'joi'
import { 
  DATE_REGEX,
  ONLY_NUMBERS_REGEX,
  PASSWORD_REGEX
} from '../regex-validator'

export const registerValidator = Joi.object({
  fullName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }).required(),
  password: Joi.string().regex(PASSWORD_REGEX).required(),
  confirmPassword: Joi.ref('password'),
  birthDate: Joi.string().regex(DATE_REGEX).message('birthDate must be YYYY-MM-DD.'),
  personalDocument: Joi.string().length(11).regex(ONLY_NUMBERS_REGEX).message('personalDocument allow only numbers.').required(),
})
