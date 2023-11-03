import { Test, TestingModule } from '@nestjs/testing';
import { CloudBatchService } from './cloud-batch.service';

describe('CloudBatchService', () => {
  let service: CloudBatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudBatchService],
    }).compile();

    service = module.get<CloudBatchService>(CloudBatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
