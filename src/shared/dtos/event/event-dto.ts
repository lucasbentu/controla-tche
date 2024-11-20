import { ObjectId } from "mongodb";

export type EventDto = {
  title: string
  createdBy: string
  updatedBy?: string
}


export type EventResponseDto = EventDto & {
  id: ObjectId,
  createdAt: Date,
  updatedAt?: Date;
}