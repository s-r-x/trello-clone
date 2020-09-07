import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from '@/typings';

@ObjectType()
export class CheckList {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => String)
  boardId: ObjectId;

  @Field(() => String)
  cardId: ObjectId;

  @Field()
  title: string;
}
