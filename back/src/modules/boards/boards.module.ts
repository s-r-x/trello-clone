import { Module, forwardRef } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardDocument, BoardSchema } from './schemas/board.schema';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsResolvers } from './resolvers/boards.resolvers';
import { ListsModule } from '../lists/lists.module';
import { BoardsMutations } from './mutations/boards.mutations';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BoardDocument.name,
        schema: BoardSchema,
      },
    ]),
    forwardRef(() => UsersModule),
    forwardRef(() => ListsModule),
  ],
  providers: [BoardsService, BoardsResolvers, BoardsMutations],
  exports: [BoardsService],
})
export class BoardsModule {}
