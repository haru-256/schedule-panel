import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class ListJobDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty()
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  ids: string[];
}
