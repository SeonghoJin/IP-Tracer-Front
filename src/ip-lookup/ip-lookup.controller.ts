import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { IpLookupService } from './ip-lookup.service';
import Bull from 'bull';

@Controller('ip-lookup')
export class IpLookupController {
  constructor(private readonly ipLookupService: IpLookupService) {}

  @Post('/location')
  async findLocation(@Body('ip') ip): Promise<Bull.JobId> {
    return await this.ipLookupService.createFindLocationJob(ip);
  }

  @Get('/location/:jobId')
  async getLocation(@Param('jobId') jobId: string) {
    const job = await this.ipLookupService.getLocationByJobId(jobId);

    if (!job) {
      return {
        statusCode: HttpStatus.ACCEPTED,
      };
    }

    return job;
  }
}
