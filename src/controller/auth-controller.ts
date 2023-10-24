import Container, { Service } from 'typedi'
import { Request, Response } from 'express'
import { AuthLogic } from '../logic'

@Service()
export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body // TODO: Validar email e password
    
    const authLogic = Container.get(AuthLogic)
    return await authLogic.login(req, res)
  }  
  
  static async register(req: Request, res: Response) {
    const { userName, email, password } = req.body  // TODO: Validar email, userName e password

    const authLogic = Container.get(AuthLogic)
    return await authLogic.register(req, res)
  }
}
