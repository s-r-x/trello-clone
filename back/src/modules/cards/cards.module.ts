import { Module, forwardRef } from '@nestjs/common';
import { CardsService } from './cards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardDocument, CardSchema } from './schemas/card.schema';
import { BoardsModule } from '@/modules/boards/boards.module';
import { ListsModule } from '../lists/lists.module';
import { CardsResolver } from './resolvers/cards.resolver';
import { CardsMutations } from './mutations/cards.mutations';
import { UsersModule } from '../users/users.module';
import { CardsPolicies } from './cards.policies';
import { CheckItemsModule } from '../check-items/check-items.module';
import { CheckListsModule } from '../check-lists/check-lists.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CardDocument.name,
        schema: CardSchema,
      },
    ]),
    forwardRef(() => ListsModule),
    forwardRef(() => BoardsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => CheckListsModule),
    forwardRef(() => CheckItemsModule),
  ],
  providers: [CardsService, CardsResolver, CardsMutations, CardsPolicies],
  exports: [CardsService],
})
export class CardsModule {}
