import { Injectable, UseGuards } from '@nestjs/common';
import { CheckItemsService } from '../check-items.service';
import { AuthOnlyGuard } from '@/modules/auth/guards/auth-only.guard';
import { Mutation, Args } from '@nestjs/graphql';
import { CheckItem } from '../schemas/check-item.gql.schema';
import {
  createCheckItemDtoName,
  CreateCheckItemDto,
} from '../dto/create-check-item.dto';

@Injectable()
export class CheckItemsMutations {
  constructor(private checkItemsService: CheckItemsService) {}

  @UseGuards(AuthOnlyGuard)
  @Mutation(() => CheckItem, { name: 'createCheckItem' })
  async createCheckItem(@Args(createCheckItemDtoName) dto: CreateCheckItemDto) {
    return this.checkItemsService.create(dto);
  }
}
