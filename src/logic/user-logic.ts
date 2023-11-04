import { Request, Response } from 'express'
import { UserRepository } from '../repository'
import { Service } from 'typedi'

@Service()
export class UserLogic {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async findAll(): Promise<any> {
    try {
      const users = await this.userRepository.findAll()
      return { users }
    } catch (error) {
      console.error(error)
      throw error
    }
  }  
  
  public async findOne(params: any): Promise<any> {
    try {
      const { id } = params

      const user =  await this.userRepository.findOneUserById(id)

      if (!user) {
        return {}
      }
      
      return { user }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
