import Container, { Service } from 'typedi'
import { NextFunction, Request, Response } from 'express'
import { AuthLogic } from '../logic'
import { loginValidator, registerValidator } from './validators'

@Service()
export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = loginValidator.validate(req.body)
    
      if (error) return res.status(400).json({ error: error.details })
      
      const authLogic = Container.get(AuthLogic)
      
      return await authLogic.login(req, res)  
    } catch (error) {
      next(error)
    }
    
  }  
  
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = registerValidator.validate(req.body)

    if (error) return res.status(400).json({ error: error.details })

    const authLogic = Container.get(AuthLogic)
    const response = await authLogic.register(req, res)
    
    return res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }
}
