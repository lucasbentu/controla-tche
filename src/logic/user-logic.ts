import { ParamsDictionary } from 'express-serve-static-core'
import { UserRepository } from '../repository'
import { Service } from 'typedi'
import { UserResponseDto } from '../shared/dtos'

@Service()
export class UserLogic {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async findAll(): Promise<UserResponseDto[]> {
    try {
      const users = await this.userRepository.findAll()
      return users
    } catch (error) {
      console.error(error)
      throw error
    }
  }  
  
  public async findOne(params: ParamsDictionary): Promise<UserResponseDto | null > {
    try {
      const { id } = params

      const user =  await this.userRepository.findOneUserById(id)

      if (!user) {
        return null
      }
      
      return user
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
