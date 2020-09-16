import { Module } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LabelDocument, LabelSchema } from './schema/label.schema';
import { LabelsResolvers } from './resolvers/labels.resolvers';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LabelDocument.name,
        schema: LabelSchema,
      },
    ]),
  ],
  providers: [LabelsService, LabelsResolvers],
  exports: [LabelsService],
})
export class LabelsModule {}
