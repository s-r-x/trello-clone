import { ObjectType, Field, ID } from '@nestjs/graphql';
import { List } from '@/modules/lists/schemas/list.graphql.schema';
import { Board } from '@/modules/boards/schemas/board.graphql.schema';
import { User } from '@/modules/users/schemas/user.graphql.schema';
import { ObjectId } from '@/typings';

@ObjectType()
export class Card {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => List)
  list: string;

  @Field(() => Board)
  board: ObjectId;

  @Field({ nullable: true })
  desc: string;

  @Field()
  title: string;

  @Field(() => User)
  creator: ObjectId;

  @Field()
  commentsCount: number;
}
