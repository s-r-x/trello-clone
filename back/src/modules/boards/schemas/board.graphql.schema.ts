import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from '@/typings';

@ObjectType()
export class Board {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  private: boolean;

  @Field()
  title: string;

  @Field({ nullable: true })
  bg: string;

  @Field(() => [String])
  membersIds: ObjectId[];

  @Field(() => String)
  ownerId: ObjectId;

  @Field()
  closed: boolean;
}
