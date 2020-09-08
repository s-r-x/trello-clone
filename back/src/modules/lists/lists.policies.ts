import { Injectable } from '@nestjs/common';
import { ListsService } from './lists.service';
import { BoardsPolicies } from '../boards/boards.policies';
import { CreateListDto } from './dto/create-list.dto';

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
}
