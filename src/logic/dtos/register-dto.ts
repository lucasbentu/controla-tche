import { ObjectId } from 'mongodb'

export interface RegisterDto {
  username: Readonly<string>
  birthDay?: string
  email: Readonly<string>
  password: Readonly<string>
}

export interface RegisterResponse extends Omit<RegisterDto, 'password'> {
  id: ObjectId
  createdAt: Date 
  updatedAt?: Date
}
