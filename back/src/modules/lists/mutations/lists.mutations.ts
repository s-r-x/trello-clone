import { Injectable, UseGuards } from '@nestjs/common';
import { ListsService } from '../lists.service';
import { AuthOnlyGuard } from '@/modules/auth/guards/auth-only.guard';
import { CreateListGuard } from '../guards/create-list.guard';
import { Mutation, Args } from '@nestjs/graphql';
import { List } from '../schemas/list.graphql.schema';
import { createListDtoName, CreateListDto } from '../dto/create-list.dto';
import { RemoveListGuard } from '../guards/remove-list.guard';

@Injectable()
export class ListsMutations {
  constructor(private listsService: ListsService) {}

  @UseGuards(AuthOnlyGuard, CreateListGuard)
  @Mutation(() => List, { name: 'createList' })
  async createList(@Args(createListDtoName) dto: CreateListDto) {
    return this.listsService.create(dto);
  }

  @UseGuards(AuthOnlyGuard, RemoveListGuard)
  @Mutation(() => Number, { name: 'removeList' })
  async removeList(@Args('id') listId: string) {
    return this.listsService.removeList(listId);
  }
}
