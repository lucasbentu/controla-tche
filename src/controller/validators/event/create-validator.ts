import Joi from 'joi'
import { DATE_REGEX, ONLY_NUMBERS_REGEX } from '../regex-validator'

export const createValidator = Joi.object({
  eventName: Joi.string().required(),
  eventDate: Joi.string().regex(DATE_REGEX).message('eventDate must be YYYY-MM-DD.').required(),
  estimatedParticipants: Joi.number().required(),
  averageFee: Joi.number().required(),
  company: Joi.string().required(),
  description: Joi.string(),
  bannerUrl: Joi.string(),
  responsible: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }).required(),
  phone: Joi.string().regex(ONLY_NUMBERS_REGEX).message('phone allow only numbers.').required(),
  dateSubscribedStart: Joi.string().regex(DATE_REGEX).message('dateSubscribedStart must be YYYY-MM-DD.').required(),
  dateSubscribedEnd: Joi.string().regex(DATE_REGEX).message('dateSubscribedEnd must be YYYY-MM-DD.').required(),
})

