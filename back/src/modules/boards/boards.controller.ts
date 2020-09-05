import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { CreateBoardGuard } from './guards/create-board.guard';
import { Board } from './schemas/board.schema';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { GetBoardGuard } from './guards/get-board.guard';
import { ParseObjectIdPipe } from '@/pipes/parse-objectid.pipe';
import { ObjectId } from '@/typings';

@Controller('boards')
@ApiTags('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @ApiOkResponse({
    type: [Board],
  })
  @Get()
  async findAll() {
    return this.boardsService.findAll();
  }

  @ApiOkResponse({
    type: Board,
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard, GetBoardGuard)
  findById(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.boardsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, CreateBoardGuard)
  create(@Body() data: CreateBoardDto) {
    return this.boardsService.create(data);
  }
}
