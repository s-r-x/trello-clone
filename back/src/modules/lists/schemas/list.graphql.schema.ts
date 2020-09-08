import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { ObjectId } from '@/typings';

@ObjectType()
export class List {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => String)
  boardId: ObjectId;

  @Field(() => String)
  creatorId: ObjectId;

  @Field(() => Int)
  slot: number;

  @Field()
  title: string;
}
