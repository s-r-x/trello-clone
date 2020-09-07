import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from '@/typings';

@ObjectType()
export class CheckItem {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  title: string;

  @Field(() => String)
  checkListId: ObjectId;

  @Field()
  checked: boolean;
}
