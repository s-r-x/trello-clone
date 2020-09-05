import { Controller, Get, Param, Post, UseGuards, Body } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateListGuard } from './guards/create-list.guard';
import { ObjectId } from '@/typings';

@Controller('lists')
export class ListsController {
  constructor(private listsService: ListsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreateListGuard)
  create(@Body() data: CreateListDto) {
    return this.listsService.create(data);
  }
  @Get()
  findAll() {
    return this.listsService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: ObjectId) {
    return this.listsService.findById(id);
  }
}
