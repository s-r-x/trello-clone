import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Card extends Document {
  @Prop({
    ref: 'List',
    index: true,
    required: true,
  })
  @ApiProperty({
    type: String,
  })
  list: Types.ObjectId;

  @Prop()
  @ApiProperty()
  desc: string;

  @Prop({
    required: true,
  })
  @ApiProperty()
  title: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
