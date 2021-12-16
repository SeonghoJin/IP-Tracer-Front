import {
  DynamicModule,
  Inject,
  Logger,
  Module,
  Provider,
  ValueProvider,
} from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { EmailService } from './email.service';
import { EmailAsyncOptions, EmailOptions } from './interfaces';
import { constants } from './constants';

@Module({})
export class EmailModule {
  public static forRoot(options: EmailOptions): DynamicModule {
    const TransporterProvider: ValueProvider<Transporter> = {
      provide: constants.Transporter,
      useValue: createTransport(options),
    };

    return {
      module: EmailModule,
      providers: [TransporterProvider, EmailService],
      exports: [EmailService],
    };
  }

  public static forRootAsync(options: EmailAsyncOptions): DynamicModule {
    const OptionProvider: Provider<EmailOptions> = {
      provide: constants.OptionProvider,
      useFactory: options.useFactory,
      inject: options.inject,
    };

    const TransporterProvider: Provider<Transporter> = {
      provide: constants.Transporter,
      useFactory: (emailOptions: EmailOptions) => {
        return createTransport(emailOptions);
      },
      inject: [constants.OptionProvider],
    };

    return {
      module: EmailModule,
      providers: [OptionProvider, TransporterProvider, EmailService],
      exports: [EmailService],
      imports: options.imports,
    };
  }
}
