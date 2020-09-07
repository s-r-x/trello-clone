import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Board } from '@/modules/boards/schemas/board.graphql.schema';
import { User } from '@/modules/users/schemas/user.graphql.schema';
import { ObjectId } from '@/typings';

@ObjectType()
export class List {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => Board)
  board: ObjectId;

  @Field(() => User)
  creator: ObjectId;

  @Field(() => Int)
  slot: number;

  @Field()
  title: string;
}
