import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '@/modules/users/schemas/user.graphql.schema';
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

  @Field(() => User)
  owner: ObjectId;
  @Field(() => [User])
  members: ObjectId[];
}
