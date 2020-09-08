import { Injectable } from '@nestjs/common';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';
import { CheckItemDocument } from './schemas/check-item.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCheckItemDto } from './dto/create-check-item.dto';

@Injectable()
export class CheckItemsService extends AbstractCRUDService<CheckItemDocument> {
  constructor(
    @InjectModel(CheckItemDocument.name)
    protected model: Model<CheckItemDocument>,
  ) {
    super();
  }
  async create(data: CreateCheckItemDto) {
    return super.create(data);
  }
}
