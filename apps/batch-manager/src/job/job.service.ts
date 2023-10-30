import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { PrismaService } from '../prisma/prisma.service';
import { generateJobId } from 'src/lib/random-string';
import { BatchService } from 'src/batch/batch.service';
import { JobEntity } from './entities/job.entity';

@Injectable()
export class JobService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly batch: BatchService,
  ) {}

  // TODO: cloud batchにjobを投げる。また、以下2つはatomicにする
  // 1. jobを作成する, 2. cloud batchにjobを投げる
  async create(createJobDto: CreateJobDto): Promise<JobEntity> {
    const batch = await this.batch.findOne(createJobDto.batchId);
    const id = generateJobId(batch.name);
    const job = await this.prisma.job.create({
      data: { id, batchId: batch.id },
      include: { batch: true },
    });
    return new JobEntity(job);
  }

  async history(batchId: string): Promise<JobEntity[]> {
    const job = await this.prisma.job.findMany({
      where: { batchId },
    });
    return job.map((job) => new JobEntity(job));
  }

  async findOne(id: string): Promise<JobEntity> {
    const job = await this.prisma.job.findUnique({ where: { id } });
    return new JobEntity(job);
  }

  async remove(id: string): Promise<JobEntity> {
    const job = await this.prisma.job.delete({ where: { id } });
    return new JobEntity(job);
  }
}
