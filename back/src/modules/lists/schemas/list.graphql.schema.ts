import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Board } from '@/modules/boards/schemas/board.graphql.schema';
import { User } from '@/modules/users/schemas/user.graphql.schema';

@ObjectType()
export class List {
  @Field(() => ID)
  _id: string;

  @Field(() => Board)
  board: string;

  @Field(() => User)
  creator: string;

  @Field(() => Int)
  slot: number;

  @Field()
  title: string;
}
