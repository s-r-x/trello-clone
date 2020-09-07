import { Injectable } from '@nestjs/common';
import { ListDocument } from './schemas/list.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateListDto } from './dto/create-list.dto';
import { ObjectId, TAnyDict } from '@/typings';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(ListDocument.name) private listModel: Model<ListDocument>,
  ) {}
  public async findMany(query?: TAnyDict) {
    return this.listModel.find(query);
  }
  public async findById(id: ObjectId) {
    return this.listModel.findById(id);
  }
  public async isExists(query: TAnyDict) {
    return this.listModel.exists(query);
  }
  public async create(data: CreateListDto) {
    const list = new this.listModel(data);
    await list.save();
    return list;
  }
}
