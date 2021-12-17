import { Inject, Injectable } from '@nestjs/common';
import { EmailService } from '../modules/email/email.service';
import { FeedBackConfig } from '../config/feedback.config';
import { ConfigType } from '@nestjs/config';
import { FeedBack } from '../resource/FeedBack';

@Injectable()
export class AppService {
  constructor(
    private readonly emailService: EmailService,
    @Inject(FeedBackConfig.KEY)
    private readonly feedbackConfig: ConfigType<typeof FeedBackConfig>,
  ) {}

  async processUserFeedback(feedback: string) {
    const { sender, receiver } = this.feedbackConfig;
    const response = await this.emailService.send(
      sender,
      receiver,
      FeedBack.subject,
      feedback,
    );

    return response;
  }
}
