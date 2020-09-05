import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
@ApiTags('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  create(@Body() data: CreateBoardDto) {
    return this.boardsService.create(data);
  }
}
