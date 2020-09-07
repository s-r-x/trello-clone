import { Injectable } from '@nestjs/common';
import { BoardDocument } from './schemas/board.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId, TAnyDict } from '@/typings';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';

@Injectable()
export class BoardsService extends AbstractCRUDService<BoardDocument> {
  constructor(
    @InjectModel(BoardDocument.name) protected model: Model<BoardDocument>,
  ) {
    super();
  }
  public findByMembers(members: ObjectId[]) {
    return this.findMany({
      members: {
        $in: members,
      },
    });
  }
  public isUserAllowedToRead(user: ObjectId, board: ObjectId) {
    if (user) {
      return this.isExists({
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
      return this.isExists({
        _id: board,
        private: false,
      });
    }
  }
  public isUserAllowedToWrite(user: ObjectId, board: ObjectId) {
    return this.isExists({
      _id: board,
      members: {
        $in: [user],
      },
    });
  }
  public async create(data: CreateBoardDto) {
    const board = new this.model(data);
    board.members = [data.owner];
    await board.save();
    return board;
  }
}
