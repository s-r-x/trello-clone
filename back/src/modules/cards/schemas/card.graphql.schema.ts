import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from '@/typings';

@ObjectType()
export class Card {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => String)
  listId: ObjectId;

  @Field(() => String)
  boardId: ObjectId;

  @Field({ nullable: true })
  desc: string;

  @Field()
  title: string;

  @Field(() => String)
  creatorId: ObjectId;

  @Field()
  commentsCount: number;
}
