import { Controller, Get, Param, Post, UseGuards, Body } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { CreateListGuard } from './guards/create-list.guard';
import { ObjectId } from '@/typings';
import { ApiTags } from '@nestjs/swagger';
import { ObjectIdParamGuard } from '@/common/guards/objectid-param.guard';

@Controller('lists')
@ApiTags('lists')
export class ListsController {
  constructor(private listsService: ListsService) {}

  @Post()
  @UseGuards(CreateListGuard)
  create(@Body() data: CreateListDto) {
    return this.listsService.create(data);
  }

  @Get()
  findAll() {
    return 1;
  }

  @Get(':id')
  @UseGuards(ObjectIdParamGuard)
  findById(@Param('id') id: ObjectId) {
    return this.listsService.findById(id);
  }
}
