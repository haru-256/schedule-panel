import { ApiProperty } from '@nestjs/swagger';
import { Batch } from '@prisma/client';

export class BatchEntity implements Batch {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  machineType: string;

  @ApiProperty()
  owner: string;

  // TODO: cron syntax validation
  @ApiProperty()
  scheduledAt: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  // TODO: 最新のjobの実行時間とstatusをどうするか
  constructor(data: Partial<BatchEntity>) {
    Object.assign(this, data);
  }
}
