import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { PrismaService } from '../prisma/prisma.service';
import { generateJobName } from 'src/utils/random-string';
import { BatchService } from 'src/batch/batch.service';
import { JobEntity } from './entities/job.entity';
import { CloudBatchService } from 'src/cloud-batch/cloud-batch.service';

@Injectable()
export class JobService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly batch: BatchService,
    private readonly cloudBatch: CloudBatchService,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<JobEntity> {
    const batch = await this.batch.findOne(createJobDto.batchId);
    const jobName = generateJobName(batch.id);
    const cloudBatchJob = await this.cloudBatch.createJob({ jobName, batch });
    const jobModel = await this.prisma.job.create({
      data: {
        id: cloudBatchJob.uid,
        name: cloudBatchJob.name,
        batchId: batch.id,
      },
      include: { batch: true },
    });
    return new JobEntity({
      ...jobModel,
      status: cloudBatchJob.status.state.toString(),
    });
  }

  async history(batchId: string): Promise<JobEntity[]> {
    const jobs = await this.prisma.job.findMany({
      where: { batchId },
    });
    const cloudBatchJobs = await this.cloudBatch.listJobs(batchId);
    return jobs.map((job) => {
      const cloudBatchJob = cloudBatchJobs.find((j) => j.uid === job.id);
      if (!cloudBatchJob) {
        return new JobEntity({ ...job, status: 'UNKNOWN' });
      }
      return new JobEntity({
        ...job,
        status: cloudBatchJob.status.state.toString(),
      });
    });
  }

  async findOne(id: string): Promise<JobEntity> {
    const job = await this.prisma.job.findUnique({ where: { id } });
    const cloudBatchJob = await this.cloudBatch.getJob(job.name);
    return new JobEntity({
      ...job,
      status: cloudBatchJob.status.state.toString(),
    });
  }

  async remove(id: string): Promise<JobEntity> {
    const job = await this.prisma.job.delete({ where: { id } });
    return new JobEntity(job);
  }
}
