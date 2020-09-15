import { Module } from '@nestjs/common';
import { CheckListsService } from './check-lists.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CheckListDocument,
  CheckListSchema,
} from './schemas/check-list.schema';
import { CheckListsResolvers } from './resolvers/check-list.resolvers';
import { CheckListsMutations } from './mutations/check-lists.mutations';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CheckListDocument.name,
        schema: CheckListSchema,
      },
    ]),
  ],
  providers: [CheckListsService, CheckListsResolvers, CheckListsMutations],
  exports: [CheckListsService],
})
export class CheckListsModule {}
