import Joi from 'joi'

export const updateValidator = Joi.object({
    title: Joi.string().min(3)
})

