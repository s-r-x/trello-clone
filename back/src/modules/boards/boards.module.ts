import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board, BoardSchema } from './schemas/board.schema';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Board.name,
        useFactory: () => {
          BoardSchema.virtual('cards', {
            ref: 'Card',
            localField: '_id',
            foreignField: 'board',
          });
          return BoardSchema;
        },
      },
    ]),
    UsersModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [BoardsService],
})
export class BoardsModule {}
