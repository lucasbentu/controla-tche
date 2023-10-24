import { Request, Response } from 'express'
import { UserRepository } from '../repository'
import { Service } from 'typedi'

@Service()
export class UserLogic {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async findAll(_req: Request, res: Response): Promise<any> {
    try {
      const users = await this.userRepository.findAll()

      res.status(200).json({ users })
    } catch (error) {
      console.error(error)
    }
  }  
  
  public async findOne(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params

      const user =  await this.userRepository.findOneUserById(id)

      res.status(200).json({ user })
    } catch (error) {
      console.error(error)
    }
  }
}
