import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './schemas/card.schema';
import { Model } from 'mongoose';
import { ObjectId } from '@/typings';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}
  public findAll() {
    return this.cardModel.find({});
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
