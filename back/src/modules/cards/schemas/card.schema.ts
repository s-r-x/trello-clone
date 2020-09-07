import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { ObjectId } from '@/typings';

@SchemaDecorator({
  collection: 'cards',
})
export class CardDocument extends Document {
  @Prop({
    ref: 'List',
    index: true,
    required: true,
    type: Schema.Types.ObjectId,
  })
  list: ObjectId;

  @Prop({
    ref: 'Board',
    index: true,
    required: true,
    type: Schema.Types.ObjectId,
  })
  board: ObjectId;

  @Prop()
  desc: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
  })
  creator: ObjectId;

  @Prop({ default: 0 })
  commentsCount: number;
}

export const CardSchema = SchemaFactory.createForClass(CardDocument);
