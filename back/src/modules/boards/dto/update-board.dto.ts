import { IsString, IsBoolean, IsMongoId } from 'class-validator';
import { ObjectId } from '@/typings';
import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateBoardDto } from './create-board.dto';

@InputType()
export class UpdateBoardDto extends PartialType(
  PickType(CreateBoardDto, ['ownerId'] as const),
) {
  @IsString()
  @Field()
  title: string;

  @Field()
  @IsBoolean()
  private: boolean;

  @IsMongoId()
  @Field(() => String, {
    description: 'Current user id',
  })
  ownerId: ObjectId;
}
export const updateBoardDtoName = 'updateBoardDto';
