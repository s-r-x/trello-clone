import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { ObjectId } from '@/typings';

@SchemaDecorator({
  _id: false,
})
class BoardBackgroundDocument {
  @Prop()
  color?: string;
  @Prop()
  url?: string;
}

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

  @Prop(BoardBackgroundDocument)
  bg: BoardBackgroundDocument;

  @Prop({
    ref: 'User',
    type: Schema.Types.ObjectId,
  })
  ownerId: ObjectId;
  @Prop({
    index: true,
    ref: 'User',
    type: [Schema.Types.ObjectId],
  })
  membersIds: ObjectId[];

  @Prop({
    default: false,
  })
  closed: boolean;
}

export const BoardSchema = SchemaFactory.createForClass(BoardDocument);
