import { IsString, IsMongoId } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCardDto {
  @IsMongoId()
  @Field()
  listId: string;

  @IsMongoId()
  @Field()
  boardId: string;

  @IsString()
  @Field()
  title: string;

  @IsMongoId()
  @Field()
  creatorId: string;
}
export const createCardDtoName = 'createCardDto';
