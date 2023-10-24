import { Service } from 'typedi'
import { UserModel } from '../database/models'

@Service()
export class UserRepository {
  public async findAll(): Promise<any> {
    return UserModel.find()
  } 
  
  public async findOneUserById(id: string): Promise<any> {
    return UserModel.findOne({ _id: id })
  }

  public async getUserByEmail(email: string): Promise<any> {
    return UserModel.findOne({ email })
  }

  public async create(userDto: any) {
    return UserModel.create({
      userName: userDto.userName,
      email: userDto.email,
    })
  }
}
