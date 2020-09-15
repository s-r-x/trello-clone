import { Injectable, UseGuards } from '@nestjs/common';
import { CheckItemsService } from '../check-items.service';
import { AuthOnlyGuard } from '@/modules/auth/guards/auth-only.guard';
import { Mutation, Args } from '@nestjs/graphql';
import { CheckItem } from '../schemas/check-item.gql.schema';
import {
  createCheckItemDtoName,
  CreateCheckItemDto,
} from '../dto/create-check-item.dto';
import {
  UpdateCheckItemDto,
  updateCheckItemDtoName,
} from '../dto/update-check-item.dto';

@Injectable()
export class CheckItemsMutations {
  constructor(private checkItemsService: CheckItemsService) {}

  @UseGuards(AuthOnlyGuard)
  @Mutation(() => CheckItem, { name: 'createCheckItem' })
  async createCheckItem(@Args(createCheckItemDtoName) dto: CreateCheckItemDto) {
    return this.checkItemsService.create(dto);
  }

  @UseGuards(AuthOnlyGuard)
  @Mutation(() => CheckItem, { name: 'updateCheckItem' })
  async updateCheckItem(
    @Args(updateCheckItemDtoName) dto: UpdateCheckItemDto,
    @Args('id') id: string,
  ) {
    return this.checkItemsService.updateCheckItem(id, dto);
  }

  @UseGuards(AuthOnlyGuard)
  @Mutation(() => Number, { name: 'removeCheckItem' })
  async removeCheckItem(@Args('id') id: string) {
    return this.checkItemsService.removeCheckItem(id);
  }
}
