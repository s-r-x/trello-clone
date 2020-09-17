import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field()
  avatar: string;
}

export const updateUserDtoName = 'updateUserDto';
