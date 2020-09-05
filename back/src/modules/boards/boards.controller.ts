import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { CreateBoardGuard } from './guards/create-board.guard';
import { Board } from './schemas/board.schema';

@Controller('boards')
@ApiTags('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @ApiOkResponse({
    type: [Board],
  })
  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @ApiOkResponse({
    type: Board,
  })
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.findById(id);
  }

  @Post()
  @UseGuards(CreateBoardGuard)
  create(@Body() data: CreateBoardDto) {
    return this.boardsService.create(data);
  }
}
