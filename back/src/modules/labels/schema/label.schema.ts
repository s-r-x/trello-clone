import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { ObjectId } from '@/typings';

@SchemaDecorator({
  collection: 'labels',
})
export class LabelDocument extends Document {
  @Prop({
    index: true,
    required: true,
    type: Schema.Types.ObjectId,
  })
  boardId: ObjectId;

  @Prop()
  title: string;

  @Prop({
    required: true,
  })
  color: string;
}

export const LabelSchema = SchemaFactory.createForClass(LabelDocument);
