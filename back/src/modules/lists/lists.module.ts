import { Module, forwardRef } from '@nestjs/common';
import { ListsService } from './lists.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema, ListDocument } from './schemas/list.schema';
import { BoardsModule } from '@/modules/boards/boards.module';
import { ListsResolver } from './resolvers/lists.resolver';

@Module({
  imports: [
    forwardRef(() => BoardsModule),
    MongooseModule.forFeature([
      {
        name: ListDocument.name,
        schema: ListSchema,
      },
    ]),
  ],
  providers: [ListsService, ListsResolver],
  exports: [ListsService],
})
export class ListsModule {}
