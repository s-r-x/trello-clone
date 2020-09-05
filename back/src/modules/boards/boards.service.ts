import { Injectable } from '@nestjs/common';
import { Board } from './schemas/board.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from '@/typings';

@Injectable()
export class BoardsService {
  constructor(@InjectModel(Board.name) private boardModel: Model<Board>) {}

  public async findAll() {
    return this.boardModel.find({}).populate('owner');
  }
  public findById(id: ObjectId) {
    return this.boardModel.findById(id);
  }
  isUserAllowedToRead(user: ObjectId, board: ObjectId) {
    if (user) {
      return this.boardModel.exists({
        _id: board,
        $or: [
          {
            private: false,
          },
          {
            members: {
              $in: [user],
            },
          },
        ],
      });
    } else {
      return this.boardModel.exists({
        _id: board,
        private: false,
      });
    }
  }
  public isUserAllowedToWrite(user: ObjectId, board: ObjectId) {
    return this.boardModel.exists({
      _id: board,
      members: {
        $in: [user],
      },
    });
  }
  public async create(data: CreateBoardDto) {
    const board = new this.boardModel(data);
    await board.save();
    return board;
  }
}
