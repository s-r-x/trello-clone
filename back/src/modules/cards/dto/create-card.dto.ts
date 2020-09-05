import { IsString, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @IsMongoId()
  @ApiProperty()
  list: string;

  @IsMongoId()
  @ApiProperty()
  board: string;

  @IsString()
  @ApiProperty()
  title: string;
}
