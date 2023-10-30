import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BatchModule } from './batch/batch.module';
import { PrismaModule } from './prisma/prisma.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [BatchModule, PrismaModule, JobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
