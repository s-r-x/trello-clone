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
  board: string;

  @IsMongoId()
  @Field()
  creator: string;
}
export const createListDtoName = 'createListDto';
