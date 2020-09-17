import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from '@/typings';

@ObjectType()
export class User {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  login: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  email?: string;
}
