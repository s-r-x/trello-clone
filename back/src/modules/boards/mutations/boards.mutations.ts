import { Mutation, Args } from '@nestjs/graphql';
import { Board } from '../schemas/board.graphql.schema';
import { BoardsService } from '../boards.service';
import { CreateBoardDto, createBoardDtoName } from '../dto/create-board.dto';
import { UseGuards, Injectable } from '@nestjs/common';
import { CreateBoardGuard } from '../guards/create-board.guard';
import { AuthOnlyGuard } from '@/modules/auth/guards/auth-only.guard';

@Injectable()
export class BoardsMutations {
  constructor(private boardsService: BoardsService) {}

  @UseGuards(AuthOnlyGuard, CreateBoardGuard)
  @Mutation(() => Board, { name: 'createBoard' })
  async createBoard(@Args(createBoardDtoName) createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Mutation(() => Board, { name: 'closeBoard' })
  async closeBoard(@Args('id') id: string) {
    return this.boardsService.closeBoard(id);
  }

  @Mutation(() => Board, { name: 'openBoard' })
  async openBoard(@Args('id') id: string) {
    return this.boardsService.openBoard(id);
  }
}
