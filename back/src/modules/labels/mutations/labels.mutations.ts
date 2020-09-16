import { Injectable, UseGuards } from '@nestjs/common';
import { LabelsService } from '../labels.service';
import { AuthOnlyGuard } from '@/modules/auth/guards/auth-only.guard';
import { Mutation, Args } from '@nestjs/graphql';
import { Label } from '../schema/label.gql.schema';
import { createLabelDtoName, CreateLabelDto } from '../dto/create-label.dto';

@Injectable()
export class LabelsMutations {
  constructor(private labelsService: LabelsService) {}

  @UseGuards(AuthOnlyGuard)
  @Mutation(() => Label, { name: 'createLabel' })
  createLabel(@Args(createLabelDtoName) dto: CreateLabelDto) {
    return this.labelsService.createLabel(dto);
  }

  @UseGuards(AuthOnlyGuard)
  @Mutation(() => Number, { name: 'removeLabel' })
  removeLabel(@Args('id') labelId: string) {
    return this.labelsService.removeLabel(labelId);
  }
}
