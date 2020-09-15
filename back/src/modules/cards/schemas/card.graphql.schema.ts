import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { ObjectId } from '@/typings';
import { CardBadges } from './card-badges/card-badges.gql.schema';

@ObjectType()
export class Card {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => String)
  listId: ObjectId;

  @Field(() => String)
  boardId: ObjectId;

  @Field({ nullable: true })
  desc: string;

  @Field()
  title: string;

  @Field(() => String)
  creatorId: ObjectId;

  @Field(() => Int)
  commentsCount: number;

  @Field(() => CardBadges)
  badges: CardBadges;
}
