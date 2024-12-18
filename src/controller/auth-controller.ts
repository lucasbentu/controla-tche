import Container, { Service } from 'typedi'
import { NextFunction, Request, Response } from 'express'
import { AuthLogic } from '../logic'
import { loginValidator, registerValidator } from './validators/auth'
import { BadRequestError } from '../middlewares/error-handler/errors'
import { HttpStatusCode } from '../configs'

@Service()
export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = loginValidator.validate(req.body)
    
      if (error) throw new BadRequestError(error.message)

      const authLogic = Container.get(AuthLogic)
      const response = await authLogic.login(req.body)

      return res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      next(error)
    }
  }  
  
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = registerValidator.validate(req.body)

      if (error) throw new BadRequestError(error.message)
      
      const authLogic = Container.get(AuthLogic)
      const response = await authLogic.register(req.body)

      return res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      next(error)
    }
  }
}
