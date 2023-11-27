import { Service } from 'typedi'
import { IUser, UserModel } from '../database/models'
import { UserDto } from '../shared/dtos'

@Service()
export class UserRepository {
  public async findAll(): Promise<IUser[]> {
    return UserModel.find()
  } 
  
  public async findOneUserById(id: string): Promise<IUser | null> {
    return UserModel.findOne({ _id: id })
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email })
  }

  public async create(userDto: UserDto): Promise<IUser> {
    return UserModel.create(userDto)
  }
}
