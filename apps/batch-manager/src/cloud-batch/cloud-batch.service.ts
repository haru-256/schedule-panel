import { Injectable } from '@nestjs/common';
import { BatchEntity } from 'src/batch/entities/batch.entity';
import { BatchServiceClient, protos as _cloudBatch } from '@google-cloud/batch';
const cloudBatch = _cloudBatch.google.cloud.batch.v1;

@Injectable()
export class CloudBatchService {
  async createJob({
    jobName,
    batch,
  }: {
    jobName: string;
    batch: BatchEntity;
  }): Promise<_cloudBatch.google.cloud.batch.v1.IJob> {
    // parameters
    const project = 'haru256-schedule-panel';
    const region = 'us-central1';
    const network = `projects/${project}/global/networks/batch`;
    const subnetwork = `projects/${project}/regions/${region}/subnetworks/batch`;

    // call cloud batch to create the job.job
    const batchClient = new BatchServiceClient();
    const runnable = new cloudBatch.Runnable({
      displayName: jobName,
      container: new cloudBatch.Runnable.Container({
        imageUri: batch.imageUrl,
      }),
    });
    const taskGroup = new cloudBatch.TaskGroup({
      taskSpec: {
        runnables: [runnable],
        maxRetryCount: 0,
      },
      taskCount: 1,
      parallelism: 1,
      schedulingPolicy: 'IN_ORDER',
    });
    const allocationPolicy = new cloudBatch.AllocationPolicy({
      location: { allowedLocations: [`regions/${region}`] },
      instances: [{ policy: { machineType: batch.machineType } }],
      network: {
        networkInterfaces: [
          {
            network,
            subnetwork,
            noExternalIpAddress: true,
          },
        ],
      },
    });
    const logsPolicy = new cloudBatch.LogsPolicy({
      destination: 'CLOUD_LOGGING',
    });
    const job = new cloudBatch.Job({
      name: jobName,
      taskGroups: [taskGroup],
      allocationPolicy,
      logsPolicy,
    });

    const res = await batchClient.createJob({
      parent: 'projects/haru256-schedule-panel/locations/us-central1',
      jobId: jobName,
      job,
    });
    return res[0];
  }

  async getJob(name: string): Promise<_cloudBatch.google.cloud.batch.v1.IJob> {
    const batchClient = new BatchServiceClient();
    const res = await batchClient.getJob({ name });
    const job = res[0];
    return job;
  }

  async listJobs(
    batchId: string,
  ): Promise<_cloudBatch.google.cloud.batch.v1.IJob[]> {
    // parameters
    const project = 'haru256-schedule-panel';
    const region = 'us-central1';

    const batchClient = new BatchServiceClient({});
    const request = new cloudBatch.ListJobsRequest({
      parent: `projects/${project}/locations/${region}`,
      filter: `uid:${batchId}`,
      // pageSize: 1,
    });
    const res = await batchClient.listJobs(request);
    const jobs = res[0];
    return jobs;
  }
}
