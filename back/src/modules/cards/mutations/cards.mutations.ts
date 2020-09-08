import { Injectable, UseGuards } from '@nestjs/common';
import { CardsService } from '../cards.service';
import { AuthOnlyGuard } from '@/modules/auth/guards/auth-only.guard';
import { CreateCardGuard } from '../guards/create-card.guard';
import { Mutation, Args } from '@nestjs/graphql';
import { createListDtoName } from '@/modules/lists/dto/create-list.dto';
import { CreateCardDto } from '../dto/create-card.dto';
import { Card } from '../schemas/card.graphql.schema';
import { RemoveCardGuard } from '../guards/remove-card.guard';

@Injectable()
export class CardsMutations {
  constructor(private cardsService: CardsService) {}

  @UseGuards(AuthOnlyGuard, CreateCardGuard)
  @Mutation(() => Card, { name: 'createCard' })
  async createCard(@Args(createListDtoName) createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @UseGuards(AuthOnlyGuard, RemoveCardGuard)
  @Mutation(() => Number, { name: 'removeCard' })
  async removeCard(@Args('id') id: string) {
    return this.cardsService.removeCard(id);
  }
}
