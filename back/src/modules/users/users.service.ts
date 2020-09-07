import { Injectable } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from '@/modules/password/password.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';

@Injectable()
export class UsersService extends AbstractCRUDService<UserDocument> {
  constructor(
    @InjectModel(UserDocument.name)
    protected model: Model<UserDocument>,
    private passwordService: PasswordService,
  ) {
    super();
  }
  public async isLoginExists(login: string) {
    return this.isExists({ login });
  }
  public async isEmailExists(email: string) {
    return this.isExists({ email, isEmailConfirmed: true });
  }
  public async create(data: CreateUserDto) {
    const user = new this.model(data);
    user.password = await this.passwordService.hashPassword(data.password);
    await user.save();
    return user;
  }
}
