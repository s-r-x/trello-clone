import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { ObjectId } from '@/typings';

@SchemaDecorator({
  collection: 'boards',
})
export class BoardDocument extends Document {
  @Prop({
    default: false,
  })
  private: boolean;

  @Prop({
    required: true,
  })
  title: string;

  @Prop()
  bg: string;

  @Prop({
    ref: 'User',
    type: Schema.Types.ObjectId,
  })
  owner: ObjectId;
  @Prop({
    index: true,
    ref: 'User',
    type: [Schema.Types.ObjectId],
  })
  members: ObjectId[];
}

export const BoardSchema = SchemaFactory.createForClass(BoardDocument);
