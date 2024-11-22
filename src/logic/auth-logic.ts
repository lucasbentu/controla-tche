import { compare, hash } from 'bcryptjs'
import { Service } from 'typedi'
import jwt from 'jsonwebtoken'
import { AuthRepository, UserRepository } from '../repository'
import { AppEnvs } from '../configs'
import { ConflictError, UnauthorizedError } from '../middlewares/error-handler/errors'
import type { LoginDto, RegisterDto, RegisterResponse } from './dtos'
import type { UserPayloadDto } from '../shared/dtos'

@Service()
export class AuthLogic {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async login(userCredentials: LoginDto): Promise<{ token: string }> {
    try {
      const { email, password } = userCredentials

      const userPassword = await this.authRepository.getPasswordByEmail(email)

      if(!userPassword) {
        throw new UnauthorizedError('Invalid Credentials.')
      }

      const doesPasswordMatches = await compare(password, userPassword.passwordHash)

      if (!doesPasswordMatches) {
        throw new UnauthorizedError('Invalid Credentials.')
      }
      
      const payLoad: UserPayloadDto = {
        email: email
      }

      const token = jwt.sign(payLoad, AppEnvs.SECRET_JWT, { expiresIn: '1h' });
      
      return { token }
    } catch (error) {
      console.error(error)
      throw error
    }
  } 
  
  public async register(userCredentials: RegisterDto): Promise<RegisterResponse> {
    try {
      const { userName, birthDay, email, password } = userCredentials

      const hasUserSameEmail = await this.userRepository.getUserByEmail(email)

      if(hasUserSameEmail) {
        throw new ConflictError('This user already exist.')
      }

      const passwordHash = await hash(password, 6)

      const [_, userRegistered] = await Promise.all([
        this.authRepository.create(email, passwordHash),
        this.userRepository.create({ userName, birthDay, email })
      ])

      return userRegistered
    } catch (error) {
      console.error(error);
      throw error
    }
  }
}
