import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Board extends Document {
  @Prop({
    default: false,
  })
  @ApiProperty()
  private: boolean;

  @Prop({
    required: true,
  })
  @ApiProperty()
  title: string;

  @Prop()
  @ApiProperty()
  bg: string;

  @Prop({
    ref: 'User',
    index: true,
  })
  @ApiProperty({
    type: String,
  })
  owner: Types.ObjectId;

  @Prop({
    ref: 'User',
  })
  @ApiProperty({
    type: [String],
  })
  members: Types.ObjectId[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
