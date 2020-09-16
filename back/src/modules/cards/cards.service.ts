import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CardDocument } from './schemas/card.schema';
import { Model } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';
import { ObjectId } from '@/typings';
import { CheckItemsService } from '../check-items/check-items.service';
import { CheckListsService } from '../check-lists/check-lists.service';

@Injectable()
export class CardsService extends AbstractCRUDService<CardDocument> {
  constructor(
    @InjectModel(CardDocument.name) protected model: Model<CardDocument>,
    @Inject(forwardRef(() => CheckItemsService))
    private checkItemsService: CheckItemsService,
    @Inject(forwardRef(() => CheckListsService))
    private checkListsService: CheckListsService,
  ) {
    super();
  }
  async getBoardId(cardId: ObjectId) {
    const card = await this.findById(cardId, {
      select: 'boardId',
    });
    return card?.boardId;
  }
  async syncCheckBadges(cardId: ObjectId) {
    const [
      amount,
      checked,
    ] = await this.checkItemsService.countAmountAndCheckedByCard(cardId);
    await this.updateById(cardId, {
      badges: {
        checked,
        checkItems: amount,
      },
    });
  }
  async create(data: CreateCardDto) {
    return super.create(data);
  }
  async removeCard(cardId: ObjectId) {
    await Promise.all([
      this.checkItemsService.deleteMany({ cardId }),
      this.checkListsService.deleteMany({ cardId }),
      super.deleteById(cardId),
    ]);
    return 1;
  }
}
