import { Injectable } from '@nestjs/common';
import { EmailService } from '../modules/email/email.service';

@Injectable()
export class AppService {
  constructor(private readonly emailService: EmailService) {}

  processUserFeedback(): void {}

  test(): void {
    this.emailService.start();
  }
}
