import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { PrismaService } from '../prisma/prisma.service';
import { generateJobName } from 'src/utils/random-string';
import { BatchService } from 'src/batch/batch.service';
import { JobEntity } from './entities/job.entity';
import { CloudBatchService } from 'src/cloud-batch/cloud-batch.service';
import { protos as cloudBatchLib } from '@google-cloud/batch';
import { Job } from '@prisma/client';

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

  private mergeJobs(
    jobs: Job[],
    cloudBatchJobs: cloudBatchLib.google.cloud.batch.v1.IJob[],
  ): JobEntity[] {
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

  async history(batchId: string): Promise<JobEntity[]> {
    const jobs = await this.prisma.job.findMany({
      where: { batchId },
    });
    const cloudBatchJobs = await this.cloudBatch.historyJobs(batchId);
    return this.mergeJobs(jobs, cloudBatchJobs);
  }

  async findOne(id: string): Promise<JobEntity> {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job ${id} not found`);
    }
    const cloudBatchJob = await this.cloudBatch.getJob(job.name);
    if (!cloudBatchJob) {
      return new JobEntity({ ...job, status: 'UNKNOWN' });
    }
    return new JobEntity({
      ...job,
      status: cloudBatchJob.status.state.toString(),
    });
  }

  async findByIds(jobIds: string[]): Promise<JobEntity[]> {
    const jobs = await this.prisma.job.findMany({
      where: { id: { in: jobIds } },
    });
    if (!jobs) {
      throw new NotFoundException(`Jobs ${jobIds} not found`);
    }
    const cloudBatchJobs = await this.cloudBatch.listJobsByIds(jobIds);
    return this.mergeJobs(jobs, cloudBatchJobs);
  }

  async remove(id: string): Promise<JobEntity> {
    const job = await this.prisma.job.delete({ where: { id } });
    return new JobEntity(job);
  }
}
