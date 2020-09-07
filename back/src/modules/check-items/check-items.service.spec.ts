import { Test, TestingModule } from '@nestjs/testing';
import { CheckItemsService } from './check-items.service';

describe('CheckItemsService', () => {
  let service: CheckItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckItemsService],
    }).compile();

    service = module.get<CheckItemsService>(CheckItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
