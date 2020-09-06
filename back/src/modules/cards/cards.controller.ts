import { Controller, Get, Param, Post, UseGuards, Body } from '@nestjs/common';
import { CardsService } from './cards.service';
import { ObjectId } from '@/typings';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCardDto } from './dto/create-card.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateCardGuard } from './guards/create-card.guard';
import { ObjectIdParamGuard } from '@/common/guards/objectid-param.guard';

@Controller('cards')
@ApiTags('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}
  @Get()
  findAll() {
    return this.cardsService.findMany();
  }

  @Get(':id')
  @UseGuards(ObjectIdParamGuard)
  findById(@Param('id') id: ObjectId) {
    return this.cardsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, CreateCardGuard)
  create(@Body() data: CreateCardDto) {
    return this.cardsService.create(data);
  }
}
