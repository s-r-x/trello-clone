import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'cards',
})
export class CardDocument extends Document {
  @Prop({
    ref: 'List',
    index: true,
    required: true,
    type: Types.ObjectId,
  })
  list: string;

  @Prop({
    ref: 'Board',
    index: true,
    required: true,
    type: Types.ObjectId,
  })
  board: string;

  @Prop()
  desc: string;

  @Prop({
    required: true,
  })
  title: string;
}

export const CardSchema = SchemaFactory.createForClass(CardDocument);
