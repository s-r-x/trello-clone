import { Request } from '@nestjs/common';
import { IPublicUser } from '@/modules/users/user.entity';

export interface IRequestWithUser extends Request {
  user: IPublicUser;
}
export interface IRequestWithUserId extends Request {
  user: number;
}