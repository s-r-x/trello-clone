import { IsString, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from '@/typings';

export class CreateCardDto {
  @IsMongoId()
  @ApiProperty({
    type: String,
  })
  list: ObjectId;

  @IsMongoId()
  @ApiProperty({
    type: String,
  })
  board: ObjectId;

  @IsString()
  @ApiProperty()
  title: string;
}
