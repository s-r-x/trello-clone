import { Module, forwardRef } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardDocument, BoardSchema } from './schemas/board.schema';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsResolver } from './resolvers/boards.resolver';
import { ListsModule } from '../lists/lists.module';

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
  providers: [BoardsService, BoardsResolver],
  exports: [BoardsService],
})
export class BoardsModule {}
