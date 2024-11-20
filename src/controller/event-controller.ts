import Container, { Service } from 'typedi'
import { NextFunction, Request, Response } from 'express'
import { EventLogic } from '../logic'
import { createValidator, findAllValidator, updateValidator } from './validators/event'
import { BadRequestError } from '../middlewares/error-handler/errors'
import { EventDto, FilterEventDto, PaginationDto } from '../shared/dtos'
import { objectIdValidator } from './validators'
import { HttpStatusCode } from '../configs'

@Service()
export class EventController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = findAllValidator.validate(req.query)

      if (error) throw new BadRequestError(error.message)

      const { limit, skip, ...filter } = req.query

      const pagination: PaginationDto<EventDto, FilterEventDto> = {
        limit: limit ? Number(limit) : undefined,
        skip: skip ? Number(skip) : undefined,
        filter
      }

      const eventLogic = Container.get(EventLogic)
      const response =  await eventLogic.findAll(pagination)
  
      return res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { error: errorId } = objectIdValidator.validate(req.params)
      const { error: errorBody } = updateValidator.validate(req.body)

      if (errorId) throw new BadRequestError(errorId.message)
      if (errorBody) throw new BadRequestError(errorBody.message)

      const { id } = req.params

      const eventLogic = Container.get(EventLogic)
      const response =  await eventLogic.update(id, req.body)
  
      return res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      next(error)
    }
  }  

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = createValidator.validate(req.body)

      if (error) throw new BadRequestError(error.message)

      const eventLogic = Container.get(EventLogic)
      const response = await eventLogic.create(req.body)

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error) {
      next(error)
    } 
  }
}
