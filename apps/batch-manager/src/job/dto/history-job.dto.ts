import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HistoryJobDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  batchId: string;
}
