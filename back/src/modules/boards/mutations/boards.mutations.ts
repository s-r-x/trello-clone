import { Mutation, Args } from '@nestjs/graphql';
import { Board } from '../schemas/board.graphql.schema';
import { BoardsService } from '../boards.service';
import { CreateBoardDto, createBoardDtoName } from '../dto/create-board.dto';
import { UseGuards, Injectable } from '@nestjs/common';
import { CreateBoardGuard } from '../guards/create-board.guard';
import { AuthOnlyGuard } from '@/modules/auth/guards/auth-only.guard';
import { OpenBoardGuard } from '../guards/open-board.guard';
import { CloseBoardGuard } from '../guards/close-board.guard';
import {
  addBoardMemberDtoName,
  AddBoardMemberDto,
} from '../dto/add-member.dto';
import { AddBoardMemberGuard } from '../guards/add-member.guard';
import { RemoveBoardMemberGuard } from '../guards/remove-member.guard';
import {
  removeBoardMemberDtoName,
  RemoveBoardMemberDto,
} from '../dto/remove-member.dto';
import { RemoveBoardGuard } from '../guards/remove-board.guard';
import { updateBoardDtoName, UpdateBoardDto } from '../dto/update-board.dto';

@Injectable()
export class BoardsMutations {
  constructor(private boardsService: BoardsService) {}

  @UseGuards(AuthOnlyGuard, CreateBoardGuard)
  @Mutation(() => Board, { name: 'createBoard' })
  async createBoard(@Args(createBoardDtoName) dto: CreateBoardDto) {
    return this.boardsService.create(dto);
  }

  @UseGuards(AuthOnlyGuard, CloseBoardGuard)
  @Mutation(() => Board, { name: 'closeBoard' })
  async closeBoard(@Args('id') id: string) {
    return this.boardsService.closeBoard(id);
  }

  @UseGuards(AuthOnlyGuard, OpenBoardGuard)
  @Mutation(() => Board, { name: 'openBoard' })
  async openBoard(@Args('id') id: string) {
    return this.boardsService.openBoard(id);
  }

  @UseGuards(AuthOnlyGuard, AddBoardMemberGuard)
  @Mutation(() => Board, { name: 'addBoardMember' })
  async addMember(@Args(addBoardMemberDtoName) dto: AddBoardMemberDto) {
    return this.boardsService.addMember(dto);
  }

  @UseGuards(AuthOnlyGuard, RemoveBoardMemberGuard)
  @Mutation(() => Board, { name: 'removeBoardMember' })
  async removeMember(
    @Args(removeBoardMemberDtoName) dto: RemoveBoardMemberDto,
  ) {
    return this.boardsService.removeMember(dto);
  }

  @UseGuards(AuthOnlyGuard, RemoveBoardGuard)
  @Mutation(() => Number, { name: 'removeBoard' })
  async removeBoard(@Args('id') id: string) {
    return this.boardsService.removeBoard(id);
  }

  @UseGuards(AuthOnlyGuard)
  @Mutation(() => Board, { name: 'updateBoard' })
  async updateBoard(
    @Args('id') boardId: string,
    @Args(updateBoardDtoName) dto: UpdateBoardDto,
  ) {
    return this.boardsService.updateBoard(boardId, dto);
  }
}
