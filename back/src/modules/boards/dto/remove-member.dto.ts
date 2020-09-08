import { AddBoardMemberDto } from './add-member.dto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class RemoveBoardMemberDto extends AddBoardMemberDto {}

export const removeBoardMemberDtoName = 'removeBoardMemberDto';
