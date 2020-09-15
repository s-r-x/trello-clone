import { Injectable } from '@nestjs/common';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';
import { CheckItemDocument } from './schemas/check-item.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCheckItemDto } from './dto/create-check-item.dto';
import { ObjectId } from '@/typings';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class CheckItemsService extends AbstractCRUDService<CheckItemDocument> {
  constructor(
    @InjectModel(CheckItemDocument.name)
    protected model: Model<CheckItemDocument>,
    private cardsService: CardsService,
  ) {
    super();
  }
  async create(data: CreateCheckItemDto) {
    const checkItem = await super.create(data);
    return checkItem;
  }
  async removeCheckItem(id: ObjectId) {
    // TODO
    await super.deleteById(id);
    return 1;
  }
}
