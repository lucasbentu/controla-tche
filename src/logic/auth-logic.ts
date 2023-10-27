import { Request, Response } from 'express'
import { compare, hash } from 'bcryptjs'
import { Service } from 'typedi'
import jwt from 'jsonwebtoken'
import { AuthRepository, UserRepository } from '../repository'
import { AppEnvs } from '../configs'

@Service()
export class AuthLogic {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body

      const userPassword = await this.authRepository.getPasswordByEmail(email)

      if(!userPassword) {
        res.status(401).json({ message: 'Token not found.' });
      }

      const doesPasswordMatches = await compare(password, userPassword.passwordHash)

      if (!doesPasswordMatches) {
        res.status(401).json({ message: 'Token not found.' });
      }

      const token = jwt.sign({ email: email }, AppEnvs.SECRET_JWT, { expiresIn: '1h' });
      
      return res.status(200).json({ token })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error });
    }
  } 
  
  public async register(req: Request, res: Response): Promise<any> {
    try {
      const { username, birthDay, email, password } = req.body

      const hasUserSameEmail = await this.userRepository.getUserByEmail(email)

      if(hasUserSameEmail) {
        res.status(409).json({ message: 'This user already exist.' });
      }

      const passwordHash = await hash(password, 6)

      const [_, user] = await Promise.all([
        this.authRepository.create(email, passwordHash),
        this.userRepository.create({ username, birthDay, email })
      ])

      return res.status(200).json({ user })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error });
    }
  }
}
