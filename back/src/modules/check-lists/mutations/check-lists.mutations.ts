import { Injectable, UseGuards } from '@nestjs/common';
import { AuthOnlyGuard } from '@/modules/auth/guards/auth-only.guard';
import { Mutation, Args } from '@nestjs/graphql';
import { CheckList } from '../schemas/check-list.gql.schema';
import {
  createCheckListDtoName,
  CreateCheckListDto,
} from '../dto/create-check-list.dto';
import { CheckListsService } from '../check-lists.service';

@Injectable()
export class CheckListsMutations {
  constructor(private checkListsService: CheckListsService) {}
  @UseGuards(AuthOnlyGuard)
  @Mutation(() => CheckList, { name: 'createCheckList' })
  async createCheckList(@Args(createCheckListDtoName) dto: CreateCheckListDto) {
    return this.checkListsService.create(dto);
  }
}
