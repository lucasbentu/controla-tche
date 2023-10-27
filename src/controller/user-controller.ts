import Container, { Service } from 'typedi'
import { Request, Response } from 'express'
import { UserLogic } from '../logic'
import { objectIdValidator } from './validators'

@Service()
export class UserController {
  static async findAll(req: Request, res: Response) {
    const userLogic = Container.get(UserLogic)
    return await userLogic.findAll(req, res)
  }  
  
  static async findOne(req: Request, res: Response) {
    const { error } = objectIdValidator.validate(req.params)
    
    if (error) return res.status(400).json({ error: error.details })

    const userLogic = Container.get(UserLogic)
    return await userLogic.findOne(req, res)
  }
}
