import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { CreateCheckItemDto } from './create-check-item.dto';

@InputType()
export class UpdateCheckItemDto extends PartialType(
  PickType(CreateCheckItemDto, ['title', 'checked'] as const),
) {}

export const updateCheckItemDtoName = 'updateCheckItemDto';