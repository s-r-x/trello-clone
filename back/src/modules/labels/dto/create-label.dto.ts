import { IsString, IsBoolean, IsMongoId } from 'class-validator';
import { ObjectId } from '@/typings';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLabelDto {
  @IsString()
  @Field()
  title: string;

  @IsMongoId()
  @Field(() => String)
  boardId: ObjectId;

  @IsString()
  @Field()
  color: string;
}
