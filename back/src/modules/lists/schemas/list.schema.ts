import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class List extends Document {
  @Prop({
    ref: 'Board',
    index: true,
    required: true,
  })
  @ApiProperty({
    type: String,
  })
  board: Types.ObjectId;

  @Prop({
    ref: 'User',
  })
  @ApiProperty({
    type: String,
  })
  creator: Types.ObjectId;

  @Prop({
    required: true,
  })
  @ApiProperty()
  slot: number;

  @Prop({
    required: true,
  })
  @ApiProperty()
  title: string;
}

export const ListSchema = SchemaFactory.createForClass(List);
