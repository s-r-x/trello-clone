import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsBoolean, IsMongoId } from 'class-validator';

@InputType()
export class CreateCheckItemDto {
  @IsString()
  @Field()
  title: string;

  @IsBoolean()
  @Field()
  checked: boolean;

  @IsMongoId()
  @Field()
  checkListId: string;
}

export const createCheckItemDtoName = 'createCheckItemDto';
