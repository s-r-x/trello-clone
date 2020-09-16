import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from '@/typings';

@ObjectType()
export class Label {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => String)
  boardId: ObjectId;

  @Field({ nullable: true })
  title?: string;

  @Field()
  color: string;
}
