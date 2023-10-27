import Container, { Service } from 'typedi'
import { Request, Response } from 'express'
import { AuthLogic } from '../logic'
import { loginValidator, registerValidator } from './validators'

@Service()
export class AuthController {
  static async login(req: Request, res: Response) {
    const { error } = loginValidator.validate(req.body)
    
    if (error) return res.status(400).json({ error: error.details })
    
    const authLogic = Container.get(AuthLogic)
    return await authLogic.login(req, res)
  }  
  
  static async register(req: Request, res: Response) {
    const { error } = registerValidator.validate(req.body)

    if (error) return res.status(400).json({ error: error.details })

    const authLogic = Container.get(AuthLogic)
    return await authLogic.register(req, res)
  }
}
