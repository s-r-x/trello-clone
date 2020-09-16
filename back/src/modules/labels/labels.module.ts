import { Module } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LabelDocument, LabelSchema } from './schema/label.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LabelDocument.name,
        schema: LabelSchema,
      },
    ]),
  ],
  providers: [LabelsService],
  exports: [LabelsService],
})
export class LabelsModule {}
