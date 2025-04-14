import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import Users from './entities/user.entity';

export type User = { userId: number; email: string; password: string }
const all_users: User[] = [
  { userId: 12, email: 'shash', password: 'dadsfas' },
  { userId: 112, email: 'shxzash', password: 'sfas' },
];

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,

    @InjectRepository(Users)
    private readonly entityRepo: EntityRepository<Users>,
  ) {}
  async create(dto: CreateUserDto) {
    const res = this.entityRepo.create(dto);
    await this.em.flush();
    return res;
  }
  async getByEmail(email: string) {
    const user = await this.entityRepo.findOne({ email });
    if (user) {
      user.password=""
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async findUserByName(username: string): Promise<User | undefined>{
    return all_users.find((user)=>user.email===username)
  }

  
}
