import { Module, forwardRef } from '@nestjs/common';
import { CheckItemsService } from './check-items.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CheckItemDocument,
  CheckItemSchema,
} from './schemas/check-item.schema';
import { CheckItemsResolvers } from './resolvers/check-items.resolvers';
import { CheckItemsMutations } from './mutations/check-items.mutations';
import { CardsModule } from '../cards/cards.module';
import { CheckListsModule } from '../check-lists/check-lists.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CheckItemDocument.name,
        schema: CheckItemSchema,
      },
    ]),
    forwardRef(() => CardsModule),
    forwardRef(() => CheckListsModule),
  ],
  providers: [CheckItemsService, CheckItemsResolvers, CheckItemsMutations],
  exports: [CheckItemsService],
})
export class CheckItemsModule {}
