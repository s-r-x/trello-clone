import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  login: string;

  @Field({ nullable: true })
  avatar: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field()
  isEmailConfirmed: boolean;

  @Field()
  isActive: boolean;
}
