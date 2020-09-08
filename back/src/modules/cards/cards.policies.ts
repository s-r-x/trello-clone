import { Injectable } from '@nestjs/common';
import { CardsService } from './cards.service';
import { BoardsPolicies } from '../boards/boards.policies';
import { ObjectId } from '@/typings';
import { CreateCardDto } from './dto/create-card.dto';
import { ListsService } from '../lists/lists.service';

@Injectable()
export class CardsPolicies {
  constructor(
    private cardsService: CardsService,
    private boardsPolicies: BoardsPolicies,
    private listsService: ListsService,
  ) {}
  public async isUserAllowedToCreateCard(data: CreateCardDto) {
    const [writeAllowed, listExists] = await Promise.all([
      this.boardsPolicies.isUserAllowedToWrite(data.creatorId, data.boardId),
      this.listsService.isExists({ _id: data.listId, board: data.boardId }),
    ]);
    return writeAllowed && listExists;
  }
  public async isUserAllowedToRemoveCard(cardId: ObjectId, userId: ObjectId) {
    const boardId = this.cardsService.getBoardId(cardId);
    if (!boardId) {
      return false;
    }
    return this.boardsPolicies.isUserAllowedToWrite(userId, boardId);
  }
}
