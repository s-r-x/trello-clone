import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDocument, UserSchema } from './schemas/user.schema';
import { PasswordModule } from '@/modules/password/password.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './resolvers/users.resolver';
import { BoardsModule } from '../boards/boards.module';

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
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
