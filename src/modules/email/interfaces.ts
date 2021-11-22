import { ModuleMetadata } from '@nestjs/common';

export type EmailOptions = {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
};

export interface EmailAsyncOptions {
  useFactory: (...args: any[]) => EmailOptions;
  inject: any[];
}
