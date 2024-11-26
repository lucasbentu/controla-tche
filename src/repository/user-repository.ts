import { Service } from 'typedi'
import { IUser, UserModel } from '../database/models'
import { FilterUserDto, PaginationDto, UserDto } from '../shared/dtos'

@Service()
export class UserRepository {
  public async findAll(pagination: PaginationDto<UserDto, FilterUserDto> = {}): Promise<PaginationDto<UserDto, FilterUserDto>> {
    pagination.skip = pagination.skip || 0, 
    pagination.limit = pagination.limit || 10,
    pagination.filter = pagination.filter || {}

    const filter = this.createFilter(pagination.filter)

    pagination.data = await UserModel
      .find(filter)
      .limit(pagination.limit)
      .skip(pagination.skip);
      
    pagination.total = await UserModel.countDocuments(filter);

    return pagination;
  }

  private createFilter(filter: FilterUserDto = {}) {
    let where = {}

    if (filter?.fullName) {
      where = { ...where, fullName: { $regex: `.*${filter.fullName}.*`, $options: 'i' } };
    }
    
    if (filter?.email) {
      where = { ...where, email: { $regex: `.*${filter.email}.*`, $options: 'i' } };
    }

    return where 
  }
  
  public async findOneUserById(id: string): Promise<IUser | null> {
    return UserModel.findOne({ _id: id })
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email })
  }

  public async create(userDto: UserDto): Promise<IUser> {
    return UserModel.create(userDto)
  }
}
