import { Injectable } from '@nestjs/common';
import { Board } from './schemas/board.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BoardsService {
  constructor(@InjectModel(Board.name) private boardModel: Model<Board>) {}

  public async findAll() {
    return this.boardModel.find({}).populate('owner');
  }
  public findById(id: number) {
    return this.boardModel.findById(id);
  }
  public async create(data: CreateBoardDto) {
    const board = new this.boardModel(data);
    await board.save();
    return board;
  }
}
