import { ParamsDictionary } from 'express-serve-static-core'
import { UserRepository } from '../repository'
import { Service } from 'typedi'
import { FilterUserDto, PaginationDto, UserDto, UserResponseDto } from '../shared/dtos'

@Service()
export class UserLogic {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async findAll(pagination: PaginationDto<UserDto, FilterUserDto> = {}): Promise<PaginationDto<UserDto, FilterUserDto>>  {
    try {
      return await this.userRepository.findAll(pagination)
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
