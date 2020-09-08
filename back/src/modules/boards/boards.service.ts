import { Injectable } from '@nestjs/common';
import { BoardDocument } from './schemas/board.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from '@/typings';
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
      membersIds: {
        $in: members,
      },
    });
  }

  public isUserAllowedToCloseBoard(user: ObjectId, board: ObjectId) {
    return this.isUserABoardAdmin(user, board);
  }
  public isUserAllowedToOpenBoard(user: ObjectId, board: ObjectId) {
    return this.isUserABoardAdmin(user, board);
  }
  private isUserABoardAdmin(user: ObjectId, board: ObjectId) {
    return this.isExists({
      _id: board,
      ownerId: user,
    });
  }
  public isUserAllowedToRead(user: ObjectId, board: ObjectId) {
    if (user) {
      return this.isExists({
        _id: board,
        closed: false,
        $or: [
          {
            private: false,
          },
          {
            membersIds: {
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
      closed: false,
      membersIds: {
        $in: [user],
      },
    });
  }
  public async create(data: CreateBoardDto) {
    const board = new this.model(data);
    board.membersIds = [data.ownerId];
    await board.save();
    return board;
  }
  public async openBoard(boardId: ObjectId) {
    const board = await this.model.findByIdAndUpdate(
      boardId,
      {
        closed: false,
      },
      {
        new: true,
        lean: true,
      },
    );
    return board;
  }
  public async closeBoard(boardId: ObjectId) {
    const board = await this.model.findByIdAndUpdate(
      boardId,
      {
        closed: true,
      },
      {
        new: true,
        lean: true,
      },
    );
    return board;
  }
}
