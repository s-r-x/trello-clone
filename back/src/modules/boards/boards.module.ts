import { Module, forwardRef } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardDocument, BoardSchema } from './schemas/board.schema';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardsResolvers } from './resolvers/boards.resolvers';
import { ListsModule } from '../lists/lists.module';
import { BoardsMutations } from './mutations/boards.mutations';
import { BoardsPolicies } from './boards.policies';
import { LabelsModule } from '../labels/labels.module';

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
    forwardRef(() => LabelsModule),
  ],
  providers: [BoardsService, BoardsResolvers, BoardsMutations, BoardsPolicies],
  exports: [BoardsService, BoardsPolicies],
})
export class BoardsModule {}
