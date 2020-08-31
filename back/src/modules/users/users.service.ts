import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }
  async create(data: CreateUserDto) {
    const entity = this.usersRepository.create(data);
    await this.usersRepository.save(entity);
    return entity;
  }
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
