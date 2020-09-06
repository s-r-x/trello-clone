import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
//import { Card } from '@/modules/cards/schemas/card.schema';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '@/modules/users/schemas/user.schema';

@Schema()
@ObjectType()
export class Board extends Document {
  @Prop()
  @Field(() => ID)
  _id: Types.ObjectId;

  @Prop({
    default: false,
  })
  @Field()
  private: boolean;

  @Prop({
    required: true,
  })
  @Field()
  title: string;

  @Prop()
  @Field({ nullable: true })
  bg: string;

  @Prop({
    ref: 'User',
    index: true,
  })
  @Field(() => User)
  owner: Types.ObjectId;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
