import { Module, forwardRef } from '@nestjs/common';
import { CardsService } from './cards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardDocument, CardSchema } from './schemas/card.schema';
import { BoardsModule } from '@/modules/boards/boards.module';
import { ListsModule } from '../lists/lists.module';
import { CardsResolver } from './resolvers/cards.resolver';
import { CardsMutations } from './mutations/cards.mutations';

@Module({
  imports: [
    forwardRef(() => ListsModule),
    forwardRef(() => BoardsModule),
    MongooseModule.forFeature([
      {
        name: CardDocument.name,
        schema: CardSchema,
      },
    ]),
  ],
  providers: [CardsService, CardsResolver, CardsMutations],
  exports: [CardsService],
})
export class CardsModule {}
