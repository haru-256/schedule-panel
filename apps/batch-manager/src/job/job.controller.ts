import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JobEntity } from './entities/job.entity';
import { HistoryJobDto } from './dto/history-job.dto';
import { ListJobDto } from './dto/list-job.dto';

@ApiTags('job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiCreatedResponse({ type: JobEntity })
  create(@Body() createJobDto: CreateJobDto): Promise<JobEntity> {
    return this.jobService.create(createJobDto);
  }

  @Get('id/:id')
  @ApiOkResponse({ type: JobEntity })
  findOne(@Param('id') id: string): Promise<JobEntity> {
    return this.jobService.findOne(id);
  }

  @Delete('id/:id')
  @ApiOkResponse({ type: JobEntity })
  remove(@Param('id') id: string): Promise<JobEntity> {
    return this.jobService.remove(id);
  }

  @Get('history/:batchId')
  @ApiOkResponse({ type: JobEntity, isArray: true })
  history(@Param() params: HistoryJobDto): Promise<JobEntity[]> {
    return this.jobService.history(params.batchId);
  }

  @Get('list')
  @ApiOkResponse({ type: JobEntity, isArray: true })
  findByIds(@Query() query: ListJobDto): Promise<JobEntity[]> {
    return this.jobService.findByIds(query.ids);
  }
}
