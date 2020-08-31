import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from './user.entity';

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
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return user;
  }
  @ApiCreatedResponse({
    type: User,
  })
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
