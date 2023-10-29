import { ApiProperty } from '@nestjs/swagger';
import { MachineType } from '../entities/machineType';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBatchDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  imageURL: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  machineType: MachineType;

  // TODO: cron syntax validation
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  scheduledAt: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  owner: string;
}
