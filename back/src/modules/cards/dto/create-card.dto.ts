import { IsString, IsMongoId } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCardDto {
  @IsMongoId()
  @Field()
  list: string;

  @IsMongoId()
  @Field()
  board: string;

  @IsString()
  @Field()
  title: string;

  @IsMongoId()
  @Field()
  creator: string;
}
export const createCardDtoName = 'createCardDto';
