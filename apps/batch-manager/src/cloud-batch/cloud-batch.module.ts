import { Module } from '@nestjs/common';
import { CloudBatchService } from './cloud-batch.service';

@Module({
  providers: [CloudBatchService],
  exports: [CloudBatchService],
})
export class CloudBatchModule {}
