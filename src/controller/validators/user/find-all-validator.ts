import Joi from 'joi'

export const findAllValidator = Joi.object({
  skip: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(1),
  userName: Joi.string(),
  email: Joi.string()
})

