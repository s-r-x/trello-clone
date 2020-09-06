import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'boards'
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
    index: true,
  })
  owner: Types.ObjectId;
}

export const BoardSchema = SchemaFactory.createForClass(BoardDocument);
