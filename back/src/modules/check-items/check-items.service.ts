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
    await this.cardsService.updateById(checkItem.cardId, {
      $inc: {
        'badges.checkItems': 1,
      },
    });
    return checkItem;
  }
  async removeCheckItem(id: ObjectId) {
    const checkItem = await super.findByIdAndDelete(id);
    if (checkItem) {
      await this.cardsService.updateById(checkItem.cardId, {
        $inc: {
          badges: {
            checkItems: -1,
            ...(checkItem.checked && { checked: -1 }),
          },
        },
      });
    }
    return 1;
  }
}
