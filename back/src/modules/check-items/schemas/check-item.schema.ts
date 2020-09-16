import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { ObjectId } from '@/typings';

@SchemaDecorator({
  collection: 'checkItems',
})
export class CheckItemDocument extends Document {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  })
  checkListId: ObjectId;

  @Prop({
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
  })
  cardId: ObjectId;

  @Prop({
    default: false,
  })
  checked: boolean;
}

export const CheckItemSchema = SchemaFactory.createForClass(CheckItemDocument);
