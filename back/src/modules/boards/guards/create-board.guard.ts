import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CreateBoardDto, createBoardDtoName } from '../dto/create-board.dto';
import { currentUserSelector } from '@/common/selectors/current-user.selector';
import { gqlArgsSelector } from '@/common/selectors/args.gql.selector';

@Injectable()
export class CreateBoardGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const user = currentUserSelector(ctx);
    const data: CreateBoardDto = gqlArgsSelector(ctx)[createBoardDtoName];
    return user === data.owner;
  }
}
