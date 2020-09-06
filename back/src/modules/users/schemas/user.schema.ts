import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Board } from '@/modules/boards/schemas/board.schema';

@Schema()
@ObjectType()
export class User extends Document {
  @Field(() => ID)
  @Prop()
  _id: Types.ObjectId;

  @Field()
  @Prop({
    unique: true,
    required: true,
  })
  login: string;

  @Field({ nullable: true })
  @Prop()
  avatar: string;

  @Field()
  @Prop({
    select: false,
  })
  password: string;

  @Field()
  @Prop()
  email: string;

  @Field()
  @Prop({ default: false })
  isEmailConfirmed: boolean;

  @Field()
  @Prop({ default: true })
  isActive: boolean;

  @Field(() => [Board])
  boards: Board[];
}

export const UserSchema = SchemaFactory.createForClass(User);
