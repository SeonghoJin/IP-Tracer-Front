import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { constants } from './constants';

@Injectable()
export class EmailService {
  constructor(
    @Inject(constants.Transporter) private transporter: Transporter,
  ) {}

  async send(from: string, to: string, subject: string, text: string) {
    const response = await this.transporter.sendMail({
      subject,
      text,
      to,
      from,
    });

    return response;
  }
}
