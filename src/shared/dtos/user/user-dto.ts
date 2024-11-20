import { ObjectId } from "mongodb"

export type UserPayloadDto = {
  email: string
}

export type UserDto = {
  userName: Readonly<string>
  birthDay?: string
  email: Readonly<string>
}

export type UserResponseDto = UserDto & {
  id: ObjectId,
  createdAt: Date,
  updatedAt?: Date;
}