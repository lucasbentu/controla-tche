import Container, { Service } from 'typedi'
import { NextFunction, Request, Response } from 'express'
import { UserLogic } from '../logic'
import { objectIdValidator } from './validators'
import { BadRequestError } from '../middlewares/error-handler/errors'

@Service()
export class UserController {
  static async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const userLogic = Container.get(UserLogic)
      const response =  await userLogic.findAll()
  
      return res.status(200).json(response)
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
  
      return res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }
}
