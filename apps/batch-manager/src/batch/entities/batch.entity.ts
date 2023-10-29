import { ApiProperty } from '@nestjs/swagger';
import { MachineType } from './machineType';

export class BatchEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  imageURL: string;

  @ApiProperty()
  machineType: MachineType;

  // TODO: cron syntax validation
  @ApiProperty()
  scheduledAt: string;

  @ApiProperty()
  owner: string;

  constructor(data: Partial<BatchEntity>) {
    Object.assign(this, data);
  }
}
