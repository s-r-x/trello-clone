import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from '@/modules/password/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private passwordService: PasswordService,
  ) {}
  public async findAll() {
    return this.usersRepository.find();
  }
  public async isLoginExists(login: string) {
    return (await this.usersRepository.count({ login })) > 0;
  }
  public async isEmailExists(email: string) {
    return (
      (await this.usersRepository.count({ email, isEmailConfirmed: true })) > 0
    );
  }
  public findById(id: number) {
    return this.usersRepository.findOne(id);
  }
  public findByLogin(login: string) {
    return this.usersRepository.findOne({ login });
  }
  public async create(data: CreateUserDto) {
    if (await this.isEmailExists(data.email)) {
      throw new ConflictException('email exists');
    }
    if (await this.isLoginExists(data.login)) {
      throw new ConflictException('login exists');
    }
    const entity = this.usersRepository.create(data);
    entity.password = await this.passwordService.hashPassword(data.password);
    await this.usersRepository.save(entity);
  }
  public async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
