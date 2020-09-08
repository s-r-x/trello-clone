import { Injectable } from '@nestjs/common';
import { BoardDocument } from './schemas/board.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from '@/typings';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';
import { AddBoardMemberDto } from './dto/add-member.dto';

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
  public async addMember(data: AddBoardMemberDto) {
    const board = await this.model.findByIdAndUpdate(
      data.boardId,
      {
        $addToSet: {
          membersIds: data.userId,
        },
      },
      {
        new: true,
        lean: true,
      },
    );
    return board;
  }
}
