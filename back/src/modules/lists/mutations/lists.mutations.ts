import { Injectable, UseGuards } from '@nestjs/common';
import { ListsService } from '../lists.service';
import { AuthOnlyGuard } from '@/modules/auth/guards/auth-only.guard';
import { CreateListGuard } from '../guards/create-list.guard';
import { Mutation, Args } from '@nestjs/graphql';
import { List } from '../schemas/list.graphql.schema';
import { createListDtoName, CreateListDto } from '../dto/create-list.dto';

@Injectable()
export class ListsMutations {
  constructor(private listsService: ListsService) {}
  @UseGuards(AuthOnlyGuard, CreateListGuard)
  @Mutation(() => List, { name: 'createList' })
  async createList(@Args(createListDtoName) createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }
}
