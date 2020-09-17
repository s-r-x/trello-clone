import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
})
export class UserDocument extends Document {
  @Prop({
    unique: true,
    required: true,
  })
  login: string;

  @Prop()
  avatar?: string;

  @Prop({
    select: false,
  })
  password: string;

  @Prop({
    unique: true,
    sparse: true,
  })
  email?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
