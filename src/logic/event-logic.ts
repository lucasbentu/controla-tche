import { Service, ServiceNotFoundError } from 'typedi'
import { EventRepository } from '../repository'
import type {
  EventDto,
  EventResponseDto,
  FilterEventDto,
  PaginationDto
} from '../shared/dtos'
import { Session } from '../middlewares/session'
import { NotFoundError, ConflictError } from '../middlewares/error-handler/errors'

@Service()
export class EventLogic {
  constructor(
    private readonly eventRepository: EventRepository
  ) {}

  public async findAll(pagination: PaginationDto<EventDto, FilterEventDto> = {}): Promise<PaginationDto<EventDto, FilterEventDto>> {
    try {
      return await this.eventRepository.findAll(pagination)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  public async update(id: string, partialEvent: Partial<EventDto>): Promise<EventResponseDto> {
    try {
      const event = await this.eventRepository.findOneById(id)
      
      if (!event) throw new NotFoundError(`Event id: ${id} not found`)

      partialEvent.updatedBy = Session.user ? Session.user.email : 'user not logged'
      
      return await this.eventRepository.update(id, partialEvent) as EventResponseDto
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  public async create(eventDto: EventDto): Promise<EventResponseDto> {
    try {
      const event = await this.eventRepository.findOne({ eventName: eventDto.eventName })

      if (event) throw new ConflictError('Event already exists')
        
      eventDto.createdBy = Session.user ? Session.user.email : 'user not logged'

      return await this.eventRepository.create(eventDto)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
