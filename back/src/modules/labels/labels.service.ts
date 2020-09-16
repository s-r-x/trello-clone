import { Injectable } from '@nestjs/common';
import { AbstractCRUDService } from '@/common/services/abstract-crud.service';
import { LabelDocument } from './schema/label.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from '@/typings';
import { CreateLabelDto } from './dto/create-label.dto';

@Injectable()
export class LabelsService extends AbstractCRUDService<LabelDocument> {
  private templateColors = ['blue', 'yellow', 'green'];
  constructor(
    @InjectModel(LabelDocument.name) protected model: Model<LabelDocument>,
  ) {
    super();
  }
  async createLabel(data: CreateLabelDto) {
    const label = await this.create(data);
    return label;
  }
  async removeLabel(labelId: ObjectId) {
    // TODO
    await this.deleteById(labelId);
    return 1;
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
