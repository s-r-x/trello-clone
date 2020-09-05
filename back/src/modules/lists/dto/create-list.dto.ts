import { IsString, IsMongoId, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from '@/typings';

export class CreateListDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsNumber()
  @ApiProperty()
  slot: number;

  @IsMongoId()
  @ApiProperty({
    type: String,
  })
  board: ObjectId;

  @IsMongoId()
  @ApiProperty({
    type: String,
  })
  creator: ObjectId;
}
