import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { ObjectIdParamGuard } from '@/common/guards/objectid-param.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOkResponse({
    type: [User],
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({
    type: User,
  })
  @Get(':id')
  @UseGuards(ObjectIdParamGuard)
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @ApiCreatedResponse()
  @Post()
  async create(@Body() data: CreateUserDto) {
    await this.usersService.create(data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
