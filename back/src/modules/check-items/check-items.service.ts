import { Injectable } from '@nestjs/common';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';
import { CheckItemDocument } from './schemas/check-item.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCheckItemDto } from './dto/create-check-item.dto';
import { ObjectId } from '@/typings';
import { CardsService } from '../cards/cards.service';
import { UpdateCheckItemDto } from './dto/update-check-item.dto';
import _ from 'lodash';

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
  async updateCheckItem(id: ObjectId, data: UpdateCheckItemDto) {
    const checkItem = await this.findByIdAndUpdate(id, data, {
      oldDoc: true,
    });
    if (!_.isUndefined(data.checked) && data.checked !== checkItem.checked) {
      await this.cardsService.updateById(checkItem.cardId, {
        $inc: {
          'badges.checked': data.checked ? 1 : -1,
        },
      });
    }
    _.merge(checkItem, data);
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
