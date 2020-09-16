import { Module, forwardRef } from '@nestjs/common';
import { ListsService } from './lists.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema, ListDocument } from './schemas/list.schema';
import { BoardsModule } from '@/modules/boards/boards.module';
import { ListsResolver } from './resolvers/lists.resolver';
import { ListsMutations } from './mutations/lists.mutations';
import { CardsModule } from '../cards/cards.module';
import { UsersModule } from '../users/users.module';
import { ListsPolicies } from './lists.policies';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ListDocument.name,
        schema: ListSchema,
      },
    ]),
    forwardRef(() => BoardsModule),
    forwardRef(() => CardsModule),
    forwardRef(() => UsersModule),
  ],
  providers: [ListsService, ListsResolver, ListsMutations, ListsPolicies],
  exports: [ListsService],
})
export class ListsModule {}
