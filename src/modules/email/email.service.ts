import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { constants } from './constants';

@Injectable()
export class EmailService {
  constructor(
    @Inject(constants.Transporter) private transporter: Transporter,
  ) {}

  start() {
    console.log('Hello');
  }
}
