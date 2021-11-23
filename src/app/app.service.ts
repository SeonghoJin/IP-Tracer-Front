import { Injectable } from '@nestjs/common';
import { EmailService } from '../modules/email/email.service';

@Injectable()
export class AppService {
  constructor(private readonly emailService: EmailService) {}

  async processUserFeedback(feedback: string) {
    const response = await this.emailService.send(
      'seongho4996@naver.com',
      'seongho4996@naver.com',
      'IP-Tracer-User-Feedback',
      feedback,
    );

    return response;
  }
}
