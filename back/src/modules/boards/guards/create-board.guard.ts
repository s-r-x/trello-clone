import { Injectable } from '@nestjs/common';
import { CreateBoardDto, createBoardDtoName } from '../dto/create-board.dto';
import { ObjectId } from '@/typings';
import { Args } from '@nestjs/graphql';
import { CurrentUser } from '@/common/decorators/current-user.decorator';

@Injectable()
export class CreateBoardGuard {
  canActivate(
    @CurrentUser() userId: ObjectId,
    @Args(createBoardDtoName) data: CreateBoardDto,
  ) {
    return userId === data.owner;
  }
}
