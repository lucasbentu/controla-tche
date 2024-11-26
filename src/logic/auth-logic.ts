import { compare, hash } from 'bcryptjs'
import { Service } from 'typedi'
import jwt from 'jsonwebtoken'
import { AuthRepository, UserRepository } from '../repository'
import { AppEnvs } from '../configs'
import { ConflictError, UnauthorizedError } from '../middlewares/error-handler/errors'
import type { LoginDto } from './dtos'
import type { UserPayloadDto, UserRegisterDto, UserResponseDto } from '../shared/dtos'

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
  
  public async register(userCredentials: UserRegisterDto): Promise<UserResponseDto> {
    try {
      const { password, ...user } = userCredentials

      const hasUserSameEmail = await this.userRepository.getUserByEmail(user.email)

      if(hasUserSameEmail) {
        throw new ConflictError('This user already exist.')
      }

      const passwordHash = await hash(password, 6)

      user.createdBy = 'admin'

      const [_, userRegistered] = await Promise.all([
        this.authRepository.create(user.email, passwordHash),
        this.userRepository.create(user)
      ])

      return userRegistered
    } catch (error) {
      console.error(error);
      throw error
    }
  }
}
