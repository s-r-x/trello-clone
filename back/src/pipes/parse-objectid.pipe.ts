import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ObjectId } from '@/typings';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
  transform(value: any): ObjectId {
    const validObjectId: boolean = Types.ObjectId.isValid(value);

    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return value;
  }
}
