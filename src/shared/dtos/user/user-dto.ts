import { ObjectId } from "mongodb"

export type UserPayloadDto = {
  email: string
}

export type UserDto = {
  fullName: Readonly<string>
  birthDate?: Date
  email: Readonly<string>
  personalDocument: Readonly<number>
  createdBy: string
  updatedBy?: string
}

export type UserRegisterDto = UserDto & {
  password: Readonly<string>
}

export type UserResponseDto = UserDto & {
  id: ObjectId,
  createdAt: Date,
  updatedAt: Date;
}