import { Resolver, Args, Query } from '@nestjs/graphql';
import { Label } from '../schema/label.gql.schema';
import { LabelsService } from '../labels.service';

@Resolver(() => Label)
export class LabelsResolvers {
  constructor(private labelsService: LabelsService) {}

  @Query(() => Label, { name: 'label' })
  async getLabel(@Args('id') id: string) {
    return this.labelsService.findById(id);
  }
  @Query(() => [Label], { name: 'labels' })
  async getLabels() {
    return this.labelsService.findMany();
  }
}
