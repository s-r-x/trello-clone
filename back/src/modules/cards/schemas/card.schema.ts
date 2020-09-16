import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';
import { ObjectId } from '@/typings';
import { CardBadgesDocument } from './card-badges/card-badges.schema';
import { LabelDocument } from '@/modules/labels/schema/label.schema';

@SchemaDecorator({
  collection: 'cards',
})
export class CardDocument extends Document {
  @Prop({
    ref: 'List',
    index: true,
    required: true,
    type: Schema.Types.ObjectId,
  })
  listId: ObjectId;

  @Prop({
    ref: 'Board',
    index: true,
    required: true,
    type: Schema.Types.ObjectId,
  })
  boardId: ObjectId;

  @Prop()
  desc: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
  })
  creatorId: ObjectId;

  @Prop({ default: 0 })
  commentsCount: number;

  @Prop(CardBadgesDocument)
  badges: CardBadgesDocument;

  @Prop([LabelDocument])
  labels: LabelDocument[];

  @Prop({
    default: false,
  })
  closed: boolean;
}

export const CardSchema = SchemaFactory.createForClass(CardDocument);
