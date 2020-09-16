import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from '@/typings';

@ObjectType()
class BoardBackground {
  @Field({ nullable: true })
  color?: string;
  @Field({ nullable: true })
  url?: string;
}

@ObjectType()
export class Board {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  private: boolean;

  @Field()
  title: string;

  @Field(() => BoardBackground, {
    nullable: true,
  })
  bg?: BoardBackground;

  @Field(() => [String])
  membersIds: ObjectId[];

  @Field(() => String)
  ownerId: ObjectId;

  @Field()
  closed: boolean;
}
