import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';
import { CheckListDocument } from './schemas/check-list.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCheckListDto } from './dto/create-check-list.dto';
import { ObjectId } from '@/typings';
import { CheckItemsService } from '../check-items/check-items.service';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class CheckListsService extends AbstractCRUDService<CheckListDocument> {
  constructor(
    @InjectModel(CheckListDocument.name)
    protected model: Model<CheckListDocument>,
    @Inject(forwardRef(() => CheckItemsService))
    private checkItemsService: CheckItemsService,
    @Inject(forwardRef(() => CardsService))
    private cardsService: CardsService,
  ) {
    super();
  }
  async create(data: CreateCheckListDto) {
    return super.create(data);
  }
  async removeCheckList(id: ObjectId) {
    const checkList = await this.findByIdAndDelete(id);
    if (!checkList) {
      throw new NotFoundException();
    }
    await this.checkItemsService.deleteMany({ checkListId: checkList._id });
    await this.cardsService.syncCheckBadges(checkList.cardId);
    return 1;
  }
}
