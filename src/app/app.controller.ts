import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/user-feedback')
  async postUserFeedback(@Body('feedback') feedback) {
    const response = await this.appService.processUserFeedback(feedback);
    return response;
  }
}
