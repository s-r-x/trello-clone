import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateBoardDto } from './create-board.dto';

@InputType()
export class UpdateBoardDto extends PartialType(
  PickType(CreateBoardDto, ['ownerId', 'title', 'private'] as const),
) {}
export const updateBoardDtoName = 'updateBoardDto';
