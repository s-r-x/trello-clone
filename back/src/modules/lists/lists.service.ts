import { Injectable } from '@nestjs/common';
import { List } from './schemas/list.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateListDto } from './dto/create-list.dto';
import { ObjectId, TAnyDict } from '@/typings';

@Injectable()
export class ListsService {
  constructor(@InjectModel(List.name) private listModel: Model<List>) {}
  public findAll() {
    return this.listModel.find({});
  }
  public findById(id: ObjectId) {
    return this.listModel.findById(id);
  }
  public isExists(query: TAnyDict) {
    return this.listModel.exists(query);
  }
  public async create(data: CreateListDto) {
    const list = new this.listModel(data);
    await list.save();
    return list;
  }
}
