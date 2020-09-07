import { Injectable } from '@nestjs/common';
import { ListDocument } from './schemas/list.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateListDto } from './dto/create-list.dto';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';

@Injectable()
export class ListsService extends AbstractCRUDService<ListDocument> {
  constructor(
    @InjectModel(ListDocument.name) protected model: Model<ListDocument>,
  ) {
    super();
  }
  public async create(data: CreateListDto) {
    return super.create(data);
  }
}
