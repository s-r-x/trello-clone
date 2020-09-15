import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CardDocument } from './schemas/card.schema';
import { Model } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';
import { ObjectId } from '@/typings';

@Injectable()
export class CardsService extends AbstractCRUDService<CardDocument> {
  constructor(
    @InjectModel(CardDocument.name) protected model: Model<CardDocument>,
  ) {
    super();
  }
  public async getBoardId(cardId: ObjectId) {
    const card = await this.findById(cardId, {
      select: 'boardId',
    });
    return card?.boardId;
  }
  public async create(data: CreateCardDto) {
    return super.create(data);
  }
  public async removeCard(id: ObjectId) {
    // TODO
    await super.deleteById(id);
    return 1;
  }
}
