import { IsString, IsBoolean, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsBoolean()
  @ApiProperty()
  private: boolean;

  @IsMongoId()
  @ApiProperty()
  owner: string;
}
