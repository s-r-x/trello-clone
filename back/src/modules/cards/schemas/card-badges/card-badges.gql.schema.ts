import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class CardBadges {
  @Field(() => Int)
  attachments: number;

  @Field(() => Int)
  checked: number;

  @Field(() => Int)
  checkItems: number;
}