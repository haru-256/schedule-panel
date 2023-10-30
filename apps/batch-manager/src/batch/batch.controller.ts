import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { BatchService } from './batch.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { BatchEntity } from './entities/batch.entity';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('batch')
@Controller('batch')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post()
  @ApiCreatedResponse({ type: BatchEntity })
  create(@Body() createBatchDto: CreateBatchDto): Promise<BatchEntity> {
    return this.batchService.create(createBatchDto);
  }

  @Get()
  @ApiOkResponse({ type: BatchEntity, isArray: true })
  findAll(): Promise<BatchEntity[]> {
    return this.batchService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BatchEntity })
  findOne(@Param('id') id: string): Promise<BatchEntity> {
    const Batch = this.batchService.findOne(id);
    if (!Batch) {
      throw new NotFoundException(`Batch with id ${id} does not exist.`);
    }
    return Batch;
  }

  @Patch(':id')
  @ApiOkResponse({ type: BatchEntity })
  update(
    @Param('id') id: string,
    @Body() updateBatchDto: UpdateBatchDto,
  ): Promise<BatchEntity> {
    return this.batchService.update(id, updateBatchDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BatchEntity })
  remove(@Param('id') id: string): Promise<BatchEntity> {
    return this.batchService.remove(id);
  }
}
