import { Injectable } from '@nestjs/common';
import { ListsService } from './lists.service';
import { BoardsPolicies } from '../boards/boards.policies';
import { CreateListDto } from './dto/create-list.dto';
import { ObjectId } from '@/typings';

@Injectable()
export class ListsPolicies {
  constructor(
    private listsService: ListsService,
    private boardsPolicies: BoardsPolicies,
  ) {}
  public async isUserAllowedToCreateList(data: CreateListDto) {
    return this.boardsPolicies.isUserAllowedToWrite(
      data.creatorId,
      data.boardId,
    );
  }
  public async isUserAllowedToRemoveList(listId: ObjectId, userId: ObjectId) {
    const boardId = await this.listsService.getBoardId(listId);
    if (!boardId) {
      return false;
    }
    return this.boardsPolicies.isUserAllowedToWrite(userId, boardId);
  }
  public async isUserAllowedToOpenList(listId: ObjectId, userId: ObjectId) {
    const boardId = await this.listsService.getBoardId(listId);
    if (!boardId) {
      return false;
    }
    return this.boardsPolicies.isUserAllowedToWrite(userId, boardId);
  }
  public async isUserAllowedToCloseList(listId: ObjectId, userId: ObjectId) {
    return this.isUserAllowedToOpenList(listId, userId);
  }
}
