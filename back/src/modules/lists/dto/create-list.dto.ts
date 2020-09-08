import { IsString, IsMongoId, IsNumber } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateListDto {
  @IsString()
  @Field()
  title: string;

  @IsNumber()
  @Field()
  slot: number;

  @IsMongoId()
  @Field()
  boardId: string;

  @IsMongoId()
  @Field()
  creatorId: string;
}
export const createListDtoName = 'createListDto';
