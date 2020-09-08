import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsMongoId } from 'class-validator';

@InputType()
export class CreateCheckListDto {
  @IsString()
  @Field()
  title: string;

  @IsMongoId()
  @Field()
  boardId: string;

  @IsMongoId()
  @Field()
  cardId: string;
}
export const createCheckListDtoName = 'createCheckListDto';
