import Joi from 'joi'
import { DATE_REGEX, ONLY_NUMBERS_REGEX } from '../regex-validator'

export const updateValidator = Joi.object({
  eventName: Joi.string(),
  eventDate: Joi.string().regex(DATE_REGEX).message('eventDate must be YYYY-MM-DD.'),
  estimatedParticipants: Joi.number(),
  averageFee: Joi.number(),
  company: Joi.string(),
  responsible: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }),
  phone: Joi.string().regex(ONLY_NUMBERS_REGEX).message('phone allow only numbers.'),
  dateSubscribedStart: Joi.string().regex(DATE_REGEX).message('dateSubscribedStart must be YYYY-MM-DD.'),
  dateSubscribedEnd: Joi.string().regex(DATE_REGEX).message('dateSubscribedEnd must be YYYY-MM-DD.'),
})

