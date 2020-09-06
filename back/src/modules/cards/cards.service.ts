import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CardDocument } from './schemas/card.schema';
import { Model } from 'mongoose';
import { ObjectId, TAnyDict } from '@/typings';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(CardDocument.name) private cardModel: Model<CardDocument>,
  ) {}
  public findMany(query?: TAnyDict) {
    return this.cardModel.find(query);
  }
  public findById(id: ObjectId) {
    return this.cardModel.findById(id);
  }
  public async create(data: CreateCardDto) {
    const card = new this.cardModel(data);
    await card.save();
    return card;
  }
}
