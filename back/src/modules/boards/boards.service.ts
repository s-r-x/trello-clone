import { Injectable } from '@nestjs/common';
import { BoardDocument } from './schemas/board.schema';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from '@/typings';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';
import { AddBoardMemberDto } from './dto/add-member.dto';
import { RemoveBoardMemberDto } from './dto/remove-member.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { LabelsService } from '../labels/labels.service';

@Injectable()
export class BoardsService extends AbstractCRUDService<BoardDocument> {
  constructor(
    @InjectModel(BoardDocument.name) protected model: Model<BoardDocument>,
    private labelsService: LabelsService,
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
    await Promise.all([
      this.labelsService.generateTemplateForBoard(board._id),
      board.save(),
    ]);
    return board;
  }
  public async openBoard(boardId: ObjectId) {
    const board = await this.findByIdAndUpdate(boardId, {
      closed: false,
    });
    return board;
  }
  public async closeBoard(boardId: ObjectId) {
    const board = await this.findByIdAndUpdate(boardId, {
      closed: true,
    });
    return board;
  }
  public async addMember(data: AddBoardMemberDto) {
    const board = await this.findByIdAndUpdate(data.boardId, {
      $addToSet: {
        membersIds: data.userId,
      },
    });
    return board;
  }
  public async removeMember(data: RemoveBoardMemberDto) {
    const board = await this.findByIdAndUpdate(data.boardId, {
      $pull: {
        membersIds: data.userId,
      },
    });
    return board;
  }
  public async updateBoard(boardId: ObjectId, data: UpdateBoardDto) {
    return super.findByIdAndUpdate(boardId, data);
  }
  public async removeBoard(boardId: ObjectId) {
    // TODO
    await super.deleteById(boardId);
    return 1;
  }
}
