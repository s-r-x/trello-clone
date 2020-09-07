import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '@/modules/users/schemas/user.graphql.schema';

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
  owner: string;
  @Field(() => [User])
  members: string[];
}
