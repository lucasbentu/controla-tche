import { Service } from 'typedi'
import { AuthModel, IAuth } from '../database/models'

@Service()
export class AuthRepository {
  public async getPasswordByEmail(email: string): Promise<IAuth | null> {
    return AuthModel.findOne({ email })
  }

  public async create(email: string, passwordHash: string): Promise<IAuth> {
    return AuthModel.create({ email, passwordHash })
  }
}
