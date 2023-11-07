import { ObjectId } from "mongodb"

export interface UserDto {
  username: string
  birthDay: string
  email: string
}

export interface UserResponseDto extends UserDto {
  id: ObjectId,
  createdAt: Date
  updatedAt?: Date;
}