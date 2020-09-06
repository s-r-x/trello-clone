import { IsString, IsEmail } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @IsString()
  @Field()
  login: string;

  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;
}
export type TGraphqlArgs = {
  createUserDto: CreateUserDto;
};
