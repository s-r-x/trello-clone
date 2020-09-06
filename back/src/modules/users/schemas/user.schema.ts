import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'users'
})
export class UserDocument extends Document {
  @Prop({
    unique: true,
    required: true,
  })
  login: string;

  @Prop()
  avatar: string;

  @Prop({
    select: false,
  })
  password: string;

  @Prop()
  email: string;

  @Prop({ default: false })
  isEmailConfirmed: boolean;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
