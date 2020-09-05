import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdParamGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { id } = context.switchToHttp().getRequest().params;
    const validObjectId: boolean = Types.ObjectId.isValid(id);
    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return true;
  }
}
