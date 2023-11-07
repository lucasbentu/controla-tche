import { ObjectId } from 'mongodb'


export interface RegisterDto {
  username: string
  birthDay: string
  email: string
  password: string
}

export interface RegisterResponse extends Omit<RegisterDto, 'password'> {
  id: ObjectId
  createdAt: Date 
  updatedAt?: Date
}
