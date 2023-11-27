import { ObjectId } from "mongodb"

export interface UserDto {
  username: Readonly<string>
  birthDay?: string
  email: Readonly<string>
}

export interface UserResponseDto extends UserDto {
  id: ObjectId,
  createdAt: Date
  updatedAt?: Date;
}