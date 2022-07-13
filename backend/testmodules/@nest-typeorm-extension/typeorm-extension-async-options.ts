import { ModuleMetadata } from '@nestjs/common/interfaces';
import { TypeOrmExtensionOptions } from './typeorm-extnsion-options';

export interface TypeORMExtensionAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => TypeOrmExtensionOptions;
  inject: any[];
}
