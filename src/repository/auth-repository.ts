import { Service } from 'typedi'
import { AuthModel } from '../database/models'

@Service()
export class AuthRepository {
  public async getPasswordByEmail(email: string): Promise<any> {
    return AuthModel.findOne({ email })
  }

  public async create(email: string, passwordHash: string) {
    return AuthModel.create({ email, passwordHash })
  }
}
