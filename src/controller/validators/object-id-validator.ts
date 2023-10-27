import Joi from 'joi'

const idValidator = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).message('Must be a MongoDB ID');

export const objectIdValidator = Joi.object({
    id: idValidator
})

