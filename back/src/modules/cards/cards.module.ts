import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './schemas/card.schema';
import { BoardsModule } from '@/modules/boards/boards.module';

@Module({
  imports: [
    BoardsModule,
    MongooseModule.forFeature([
      {
        name: Card.name,
        schema: CardSchema,
      },
    ]),
  ],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
