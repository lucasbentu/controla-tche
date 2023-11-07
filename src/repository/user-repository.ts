import { Service } from 'typedi'
import { IUser, UserModel } from '../database/models'

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

  public async create(userDto: any): Promise<IUser> {
    return UserModel.create(userDto)
  }
}
