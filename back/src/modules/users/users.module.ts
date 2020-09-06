import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDocument, UserSchema } from './schemas/user.schema';
import { PasswordModule } from '@/modules/password/password.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolvers } from './resolvers/users.resolvers';
import { BoardsModule } from '../boards/boards.module';
import { UsersMutations } from './mutations/users.mutations';

@Module({
  imports: [
    forwardRef(() => BoardsModule),
    MongooseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema,
      },
    ]),
    PasswordModule,
  ],
  providers: [UsersService, UsersResolvers, UsersMutations],
  exports: [UsersService],
})
export class UsersModule {}
