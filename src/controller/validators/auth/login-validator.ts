import Joi from 'joi'
import { PASSWORD_REGEX } from '../regex-validator'

export const loginValidator = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }).required(),
    password: Joi.string().regex(PASSWORD_REGEX).required(),
})

