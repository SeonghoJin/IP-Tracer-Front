import { ModuleMetadata } from '@nestjs/common/interfaces';

export type EmailOptions = {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
  service: string;
};

export interface EmailAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => EmailOptions;
  inject: any[];
}
