import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { ObjectId } from '@/typings';

@SchemaDecorator({
  collection: 'lists',
})
export class ListDocument extends Document {
  @Prop({
    ref: 'Board',
    index: true,
    required: true,
    type: Schema.Types.ObjectId,
  })
  boardId: ObjectId;

  @Prop({
    ref: 'User',
    type: Schema.Types.ObjectId,
  })
  creatorId: ObjectId;

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
