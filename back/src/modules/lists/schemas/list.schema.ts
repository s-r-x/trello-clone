import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'lists',
})
export class ListDocument extends Document {
  @Prop({
    ref: 'Board',
    index: true,
    required: true,
    type: Types.ObjectId,
  })
  board: string;

  @Prop({
    ref: 'User',
    type: Types.ObjectId,
  })
  creator: string;

  @Prop({
    required: true,
  })
  slot: number;

  @Prop({
    required: true,
  })
  title: string;
}

export const ListSchema = SchemaFactory.createForClass(ListDocument);
