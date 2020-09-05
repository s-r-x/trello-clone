import { Request } from '@nestjs/common';
import { User } from '@/modules/users/schemas/user.schema';

export interface IRequestWithUser extends Request {
  user: User;
}
export interface IRequestWithUserId extends Request {
  user: number;
}
