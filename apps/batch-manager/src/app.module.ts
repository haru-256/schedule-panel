import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BatchModule } from './batch/batch.module';
import { PrismaModule } from './prisma/prisma.module';
import { JobModule } from './job/job.module';
import { CloudBatchService } from './cloud-batch/cloud-batch.service';
import { CloudBatchModule } from './cloud-batch/cloud-batch.module';

@Module({
  imports: [BatchModule, PrismaModule, JobModule, CloudBatchModule],
  controllers: [AppController],
  providers: [AppService, CloudBatchService],
})
export class AppModule {}
