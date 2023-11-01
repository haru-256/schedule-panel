import { Injectable } from '@nestjs/common';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { BatchEntity } from './entities/batch.entity';
import { PrismaService } from '../prisma/prisma.service';
import { generateBatchId } from 'src/utils/random-string';

@Injectable()
export class BatchService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBatchDto: CreateBatchDto): Promise<BatchEntity> {
    const id = generateBatchId(createBatchDto.name);
    const batch = await this.prisma.batch.create({
      data: { id, ...createBatchDto },
    });
    return new BatchEntity(batch);
  }

  async findAll(): Promise<BatchEntity[]> {
    const batches = await this.prisma.batch.findMany();
    return batches.map((batch) => new BatchEntity(batch));
  }

  async findOne(id: string): Promise<BatchEntity> {
    const batch = await this.prisma.batch.findUnique({ where: { id } });
    return new BatchEntity(batch);
  }

  async update(
    id: string,
    updateBatchDto: UpdateBatchDto,
  ): Promise<BatchEntity> {
    let batch = await this.findOne(id);
    batch = await this.prisma.batch.update({
      where: { id },
      data: { ...batch, ...updateBatchDto },
    });
    return batch;
  }

  async remove(id: string): Promise<BatchEntity> {
    const batch = await this.prisma.batch.delete({ where: { id } });
    return new BatchEntity(batch);
  }
}
