export type EventDto = {
  eventName: string
  eventDate: Date
  estimatedParticipants: number
  averageFee: number
  company: string
  description?: string | null
  bannerUrl?: string | null
  responsible: string
  email: string
  phone: number
  dateSubscribedStart: Date
  dateSubscribedEnd: Date
  createdBy: string
  updatedBy?: string
}

export type EventResponseDto = EventDto & {
  id: string,
  createdAt: Date,
  updatedAt: Date;
}
