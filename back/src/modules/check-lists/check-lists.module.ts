import { Module, forwardRef } from '@nestjs/common';
import { CheckListsService } from './check-lists.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CheckListDocument,
  CheckListSchema,
} from './schemas/check-list.schema';
import { CheckListsResolvers } from './resolvers/check-list.resolvers';
import { CheckListsMutations } from './mutations/check-lists.mutations';
import { CheckItemsModule } from '../check-items/check-items.module';
import { CardsModule } from '../cards/cards.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CheckListDocument.name,
        schema: CheckListSchema,
      },
    ]),
    forwardRef(() => CheckItemsModule),
    forwardRef(() => CardsModule),
  ],
  providers: [CheckListsService, CheckListsResolvers, CheckListsMutations],
  exports: [CheckListsService],
})
export class CheckListsModule {}
