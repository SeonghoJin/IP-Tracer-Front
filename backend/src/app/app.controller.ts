import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/user-feedback')
  async postUserFeedback(@Body('feedback') feedback) {
    const response = await this.appService.processUserFeedback(feedback);
    return response;
  }

  @Get('/ping')
  ping(@Res() response: Response) {
    return response.sendStatus(200);
  }
}
