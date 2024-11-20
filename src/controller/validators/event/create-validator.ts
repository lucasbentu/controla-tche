import Joi from 'joi'

export const createValidator = Joi.object({
    title: Joi.string().required()
})

