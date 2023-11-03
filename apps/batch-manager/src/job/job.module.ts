import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BatchModule } from 'src/batch/batch.module';
import { CloudBatchModule } from 'src/cloud-batch/cloud-batch.module';

@Module({
  controllers: [JobController],
  providers: [JobService],
  imports: [PrismaModule, BatchModule, CloudBatchModule],
})
export class JobModule {}
