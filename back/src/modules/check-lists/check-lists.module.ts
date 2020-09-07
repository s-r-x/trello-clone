import { Module } from '@nestjs/common';
import { CheckListsService } from './check-lists.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CheckListDocument,
  CheckListSchema,
} from './schemas/check-list.schema';
import { CheckListsResolvers } from './resolvers/check-list.resolvers';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CheckListDocument.name,
        schema: CheckListSchema,
      },
    ]),
  ],
  providers: [CheckListsService, CheckListsResolvers],
})
export class CheckListsModule {}
