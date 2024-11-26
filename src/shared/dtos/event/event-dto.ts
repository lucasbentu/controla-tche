import { ObjectId } from "mongodb";

export type EventDto = {
  eventName: string
  eventDate: Date
  estimatedParticipants: number
  averageFee: number
  company: string
  responsible: string
  email: string
  phone: number
  dateSubscribedStart: Date
  dateSubscribedEnd: Date
  createdBy: string
  updatedBy?: string
}

export type EventResponseDto = EventDto & {
  id: ObjectId,
  createdAt: Date,
  updatedAt: Date;
}
