import { Injectable } from '@nestjs/common';
import { ListDocument } from './schemas/list.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateListDto } from './dto/create-list.dto';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';
import { ObjectId } from '@/typings';

@Injectable()
export class ListsService extends AbstractCRUDService<ListDocument> {
  constructor(
    @InjectModel(ListDocument.name) protected model: Model<ListDocument>,
  ) {
    super();
  }
  public async getBoardId(listId: ObjectId) {
    const list = await this.findById(listId, {
      select: 'boardId',
    });
    return list?.boardId;
  }
  public async create(data: CreateListDto) {
    return super.create(data);
  }
  public async openList(boardId: ObjectId) {
    const board = await this.findByIdAndUpdate(boardId, {
      closed: false,
    });
    return board;
  }
  public async closeList(boardId: ObjectId) {
    const board = await this.findByIdAndUpdate(boardId, {
      closed: true,
    });
    return board;
  }
  public async removeList(id: ObjectId) {
    // TODO
    await super.deleteById(id);
    return 1;
  }
}
