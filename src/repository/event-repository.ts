import { Service } from 'typedi'
import { EventModel, IEvent } from '../database/models'
import { EventDto, EventResponseDto, FilterEventDto, PaginationDto } from '../shared/dtos'
import { ObjectId } from 'mongodb'

@Service()
export class EventRepository {
  public async findAll(pagination: PaginationDto<EventDto, FilterEventDto> = {}): Promise<PaginationDto<EventDto, FilterEventDto>> {
    pagination.skip = pagination.skip || 0, 
    pagination.limit = pagination.limit || 10,
    pagination.filter = pagination.filter || {}

    const filter = this.createFilter(pagination.filter)

    pagination.data = await EventModel
      .find(filter)
      .limit(pagination.limit)
      .skip(pagination.skip);
      
    pagination.total = await EventModel.countDocuments(filter);

    return pagination;
  }

  private createFilter(filter: FilterEventDto = {}) {
    let where = {}

    if (filter?.eventName) {
      where = { ...where, eventName: { $regex: `.*${filter.eventName}.*`, $options: 'i' } };
    }

    return where 
  }
  
  public async findOneById(id: string): Promise<EventResponseDto | null> {
    return EventModel.findById(id)
  }

  public async findOne(filter: Partial<EventResponseDto> = {}): Promise<EventResponseDto | null> {
    return EventModel.findOne(filter)
  }
  
  public async update(id: string, partialEvent: Partial<EventDto>): Promise<EventResponseDto | null> {
    return EventModel.findOneAndUpdate(
      { _id: id },
      { $set: partialEvent},
      { new: true }
    )
  }

  public async create(eventDto: EventDto): Promise<EventResponseDto> {
    return EventModel.create(eventDto)
  }
}
