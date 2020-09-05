import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {
  @Prop({
    unique: true,
    required: true,
  })
  @ApiProperty()
  login: string;

  @Prop()
  @ApiProperty()
  avatar: string;

  @Prop({
    select: false,
  })
  @ApiProperty()
  password: string;

  @Prop()
  @ApiProperty()
  email: string;

  @Prop({ default: false })
  @ApiProperty()
  isEmailConfirmed: boolean;

  @Prop({ default: true })
  @ApiProperty()
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
