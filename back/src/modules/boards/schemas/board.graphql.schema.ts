import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '@/modules/users/schemas/user.graphql.schema';
import { Types } from 'mongoose';

@ObjectType()
export class Board {
  @Field(() => ID)
  _id: string;

  @Field()
  private: boolean;

  @Field()
  title: string;

  @Field({ nullable: true })
  bg: string;

  @Field(() => User)
  owner: Types.ObjectId;
}
