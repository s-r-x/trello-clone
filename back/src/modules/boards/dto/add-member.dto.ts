import { IsString, IsBoolean, IsMongoId } from 'class-validator';
import { ObjectId } from '@/typings';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddBoardMemberDto {
  @IsMongoId()
  @Field(() => String)
  boardId: ObjectId;

  @IsMongoId()
  @Field(() => String)
  userId: ObjectId;
}
export const addBoardMemberDtoName = 'addBoardMemberDto';
