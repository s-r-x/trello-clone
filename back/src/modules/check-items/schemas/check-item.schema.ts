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
  })
  checkListId: ObjectId;

  @Prop({
    default: false,
  })
  checked: boolean;
}

export const CheckItemSchema = SchemaFactory.createForClass(CheckItemDocument);
