import { Injectable } from '@nestjs/common';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';
import { CheckListDocument } from './schemas/check-list.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCheckListDto } from './dto/create-check-list.dto';

@Injectable()
export class CheckListsService extends AbstractCRUDService<CheckListDocument> {
  constructor(
    @InjectModel(CheckListDocument.name)
    protected model: Model<CheckListDocument>,
  ) {
    super();
  }
  create(data: CreateCheckListDto) {
    return super.create(data);
  }
}
