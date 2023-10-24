import Container, { Service } from 'typedi'
import { Request, Response } from 'express'
import { UserLogic } from '../logic'

@Service()
export class UserController {
  static async findAll(req: Request, res: Response) {
    const userLogic = Container.get(UserLogic)
    return await userLogic.findAll(req, res)
  }  
  
  static async findOne(req: Request, res: Response) {
    const { id } = req.params // TODO: Validar ID

    const userLogic = Container.get(UserLogic)
    return await userLogic.findOne(req, res)
  }
}
