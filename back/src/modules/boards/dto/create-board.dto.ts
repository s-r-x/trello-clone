import { IsString, IsBoolean, IsMongoId } from 'class-validator';
import { ObjectId } from '@/typings';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardDto {
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
  owner: ObjectId;
}
export const createBoardDtoName = 'createBoardDto';