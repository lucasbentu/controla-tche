import Joi from 'joi'

const birthDayRegex = new RegExp('^(195[0-9]|196[0-9]|197[0-9]|198[0-9]|199[0-9]|200[0-9]|201[0-5])/(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])$')

export const registerValidator = Joi.object({
  userName: Joi.string().alphanum().min(3).max(15).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  repeatPassword: Joi.ref('password'),
  birthDay: Joi.string().pattern(birthDayRegex).message('birthDay must be YYYY/MM/DD.'),
})
