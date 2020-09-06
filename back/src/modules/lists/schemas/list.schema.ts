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
  })
  board: Types.ObjectId;

  @Prop({
    ref: 'User',
  })
  creator: Types.ObjectId;

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
