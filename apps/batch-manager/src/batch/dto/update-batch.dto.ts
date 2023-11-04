import { PartialType } from '@nestjs/mapped-types';
import { CreateBatchDto } from 'src/batch/dto/create-batch.dto';

export class UpdateBatchDto extends PartialType(CreateBatchDto) {}
