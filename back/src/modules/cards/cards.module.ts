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

@Module({
  imports: [
    forwardRef(() => ListsModule),
    forwardRef(() => BoardsModule),
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      {
        name: CardDocument.name,
        schema: CardSchema,
      },
    ]),
  ],
  providers: [CardsService, CardsResolver, CardsMutations, CardsPolicies],
  exports: [CardsService],
})
export class CardsModule {}
