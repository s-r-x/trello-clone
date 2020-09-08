import { Module } from '@nestjs/common';
import { CheckItemsService } from './check-items.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CheckItemDocument,
  CheckItemSchema,
} from './schemas/check-item.schema';
import { CheckItemsResolvers } from './resolvers/check-items.resolvers';
import { CheckItemsMutations } from './mutations/check-items.mutations';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CheckItemDocument.name,
        schema: CheckItemSchema,
      },
    ]),
  ],
  providers: [CheckItemsService, CheckItemsResolvers, CheckItemsMutations],
})
export class CheckItemsModule {}
