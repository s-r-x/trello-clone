import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { ObjectId } from '@/typings';

@SchemaDecorator({
  collection: 'checkLists',
})
export class CheckListDocument extends Document {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    type: Schema.Types.ObjectId,
    required: true,
  })
  boardId: ObjectId;

  @Prop({
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  })
  cardId: ObjectId;
}
export const CheckListSchema = SchemaFactory.createForClass(CheckListDocument);
