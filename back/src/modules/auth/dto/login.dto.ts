import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginDto {
  @IsString()
  @Field()
  login: string;

  @IsString()
  @Field()
  password: string;
}
