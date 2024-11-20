import { ObjectId } from 'mongodb'

export type RegisterDto = {
  userName: Readonly<string>
  birthDay?: string
  email: Readonly<string>
  password: Readonly<string>
}

export type RegisterResponse = Omit<RegisterDto, 'password'> & {
  id: ObjectId
  createdAt: Date 
  updatedAt?: Date
}
