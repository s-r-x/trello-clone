import { Module, forwardRef } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardSchema } from './schemas/board.schema';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsResolver } from './resolvers/boards.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Board.name,
        schema: BoardSchema,
      },
    ]),
    forwardRef(() => UsersModule),
  ],
  providers: [BoardsService, BoardsResolver],
  exports: [BoardsService],
})
export class BoardsModule {}
