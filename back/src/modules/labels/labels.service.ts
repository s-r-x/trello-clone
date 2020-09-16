import { Injectable } from '@nestjs/common';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';
import { LabelDocument } from './schema/label.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from '@/typings';

@Injectable()
export class LabelsService extends AbstractCRUDService<LabelDocument> {
  private templateColors = ['blue', 'yellow', 'green'];
  constructor(
    @InjectModel(LabelDocument.name) protected model: Model<LabelDocument>,
  ) {
    super();
  }
  async generateTemplateForBoard(boardId: ObjectId) {
    await this.model.insertMany(
      this.templateColors.map(color => ({
        boardId,
        color,
      })),
    );
  }
}
