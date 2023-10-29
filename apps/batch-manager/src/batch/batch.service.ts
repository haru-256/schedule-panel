import { Injectable } from '@nestjs/common';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { BatchEntity } from './entities/batch.entity';

let batches: BatchEntity[] = [];

@Injectable()
export class BatchService {
  create(createBatchDto: CreateBatchDto): BatchEntity {
    const batch = new BatchEntity(createBatchDto);
    batches.push(batch);
    return batch;
  }

  findAll(): BatchEntity[] {
    return batches;
  }

  findOne(id: string): BatchEntity {
    const batch = batches.find((Batch) => Batch.id === id);
    return batch;
  }

  update(id: string, updateBatchDto: UpdateBatchDto) {
    let batch = this.findOne(id);
    batch = new BatchEntity({ ...batch, ...updateBatchDto });
    this.remove(id);
    batches.push(batch);

    return batch;
  }

  remove(id: string): BatchEntity {
    const removedBatch = this.findOne(id);
    batches = batches.filter((Batch) => Batch.id !== removedBatch.id);
    return removedBatch;
  }
}
