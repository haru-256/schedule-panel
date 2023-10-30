import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBatchDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  machineType: string;

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
