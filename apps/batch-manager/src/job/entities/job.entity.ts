import { ApiProperty } from '@nestjs/swagger';
import { Job } from '@prisma/client';
import { BatchEntity } from 'src/batch/entities/batch.entity';

export class JobEntity implements Job {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  // TODO: statusのgetterを作る。内部でCloud Batchに問い合わせる
  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, nullable: false })
  batchId: string;

  @ApiProperty({ required: false, type: BatchEntity })
  batch?: BatchEntity;

  constructor({ batch, ...data }: Partial<JobEntity>) {
    Object.assign(this, data);
    if (batch) {
      this.batch = new BatchEntity(batch);
    }
  }
}
