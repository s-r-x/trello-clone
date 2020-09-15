import { Prop, Schema as SchemaDecorator } from '@nestjs/mongoose';

@SchemaDecorator({
  _id: false,
})
export class CardBadgesDocument {
  @Prop({
    default: 0,
  })
  attachments: number;
  @Prop({
    default: 0,
  })
  checked: number;
  @Prop({
    default: 0,
  })
  checkedItems: number;
}
