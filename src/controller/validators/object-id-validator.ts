import Joi from 'joi'
import { MONGODB_ID } from './regex-validator'

export const objectIdValidator = Joi.object({
    id: Joi.string().required().regex(MONGODB_ID).message('Must be a MongoDB ID')
})

