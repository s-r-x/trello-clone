import { Injectable } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from '@/modules/password/password.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from '@/typings';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserDocument.name)
    private userModel: Model<UserDocument>,
    private passwordService: PasswordService,
  ) {}
  public async findAll() {
    return this.userModel.find({});
  }
  public async isLoginExists(login: string) {
    return this.userModel.exists({ login });
  }
  public async isEmailExists(email: string) {
    return this.userModel.exists({ email, isEmailConfirmed: true });
  }
  public findById(id: ObjectId) {
    return this.userModel.findById(id);
  }
  public findByLogin(login: string) {
    return this.userModel.findOne({ login });
  }
  public async create(data: CreateUserDto) {
    const user = new this.userModel(data);
    user.password = await this.passwordService.hashPassword(data.password);
    await user.save();
    return user;
  }
  public async remove(id: ObjectId) {
    await this.userModel.deleteOne({ _id: id });
  }
}
