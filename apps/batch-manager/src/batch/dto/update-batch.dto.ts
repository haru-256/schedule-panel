import { PartialType } from '@nestjs/mapped-types';
import { CreateBatchDto } from './create-Batch.dto';

export class UpdateBatchDto extends PartialType(CreateBatchDto) {}
