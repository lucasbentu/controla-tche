import Joi from 'joi'

export const loginValidator = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

