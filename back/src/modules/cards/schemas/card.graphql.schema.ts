import { Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { List } from '@/modules/lists/schemas/list.graphql.schema';
import { Board } from '@/modules/boards/schemas/board.graphql.schema';

@ObjectType()
export class Card {
  @Field(() => ID)
  _id: string;

  @Field(() => List)
  list: string;

  @Field(() => Board)
  board: string;

  @Field({ nullable: true })
  desc: string;

  @Field()
  title: string;
}
