import Container, { Service } from 'typedi'
import { NextFunction, Request, Response } from 'express'
import { UserLogic } from '../logic'
import { objectIdValidator } from './validators'
import { BadRequestError } from '../middlewares/error-handler/errors'
import { HttpStatusCode } from '../configs'
import { findAllValidator } from './validators/user'
import { FilterUserDto, PaginationDto, UserDto } from '../shared/dtos'

@Service()
export class UserController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = findAllValidator.validate(req.query)

      if (error) throw new BadRequestError(error.message)
      const { limit, skip, ...filter } = req.query

      const pagination: PaginationDto<UserDto, FilterUserDto> = {
        limit: limit ? Number(limit) : undefined,
        skip: skip ? Number(skip) : undefined,
        filter
      }
      
      const userLogic = Container.get(UserLogic)
      const response =  await userLogic.findAll(pagination)
  
      return res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      next(error)
    }
  }  
  
  static async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = objectIdValidator.validate(req.params)
      
      if (error) throw new BadRequestError(error.message)
  
      const userLogic = Container.get(UserLogic)
      const response = await userLogic.findOne(req.params)
  
      return res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      next(error)
    }
  }
}
