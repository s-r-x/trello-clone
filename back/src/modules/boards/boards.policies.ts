import { Injectable } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { ObjectId } from '@/typings';

@Injectable()
export class BoardsPolicies {
  constructor(private boardsService: BoardsService) {}

  public isUserAllowedToRemoveBoard(user: ObjectId, board: ObjectId) {
    return this.boardsService.isExists({
      _id: board,
      ownerId: user,
      closed: true,
    });
  }
  public isUserAllowedToAddMember(user: ObjectId, board: ObjectId) {
    return this.isUserABoardAdmin(user, board);
  }
  public isUserAllowedToRemoveMember(user: ObjectId, board: ObjectId) {
    return this.isUserABoardAdmin(user, board);
  }
  public isUserAllowedToCloseBoard(user: ObjectId, board: ObjectId) {
    return this.isUserABoardAdmin(user, board);
  }
  public isUserAllowedToOpenBoard(user: ObjectId, board: ObjectId) {
    return this.isUserABoardAdmin(user, board);
  }
  private isUserABoardAdmin(user: ObjectId, board: ObjectId) {
    return this.boardsService.isExists({
      _id: board,
      ownerId: user,
    });
  }
  public isUserAllowedToRead(user: ObjectId, board: ObjectId) {
    if (user) {
      return this.boardsService.isExists({
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
      return this.boardsService.isExists({
        _id: board,
        private: false,
      });
    }
  }
  public isUserAllowedToWrite(user: ObjectId, board: ObjectId) {
    return this.boardsService.isExists({
      _id: board,
      closed: false,
      membersIds: {
        $in: [user],
      },
    });
  }
}
