import { IsString, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from '@/typings';

export class CreateCardDto {
  @IsMongoId()
  @ApiProperty()
  list: ObjectId;

  @IsMongoId()
  @ApiProperty()
  board: ObjectId;

  @IsString()
  @ApiProperty()
  title: string;
}
