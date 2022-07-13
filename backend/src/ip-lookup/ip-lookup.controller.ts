import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { IpLookupService } from './ip-lookup.service';
import { IpLocationResponseDto } from './dto/ip-location.response.dto';

@Controller('ip-lookup')
export class IpLookupController {
  constructor(private readonly ipLookupService: IpLookupService) {}

  @Post('/location')
  async findLocation(@Body('ip') ip): Promise<IpLocationResponseDto> {
    return await this.ipLookupService.getLocation(ip);
  }

  @Get('/api/health')
  async getApiHealths() {
    const apiStatus = await this.ipLookupService.getApiHealths();
    return apiStatus;
  }

  @Get('/api/health/:apiName')
  async getApiHealth(@Param('apiName') apiName: string) {
    const apiStatus = await this.ipLookupService.getApiHealth(apiName);
  }
}
