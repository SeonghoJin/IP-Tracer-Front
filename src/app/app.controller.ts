import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/user-feedback')
  postUserFeedback(@Body('feedback') feedback): void {
    this.appService.processUserFeedback();
  }

  @Get()
  test(): void {
    this.appService.test();
  }
}
