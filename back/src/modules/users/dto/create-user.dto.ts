import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  @Length(2, 10)
  login: string;

  @IsEmail()
  @Field()
  email: string;

  @Field()
  @Length(4, 64)
  password: string;
}
export const createUserDtoName = 'createUserDto';
