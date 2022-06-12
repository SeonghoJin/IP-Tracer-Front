import { DynamicModule, Module } from '@nestjs/common';
import { TypeormExtensionService } from './typeorm-extension.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExtensionOptions } from './typeorm-extnsion-options';
import { TypeORMExtensionAsyncOptions } from './typeorm-extension-async-options';

export class TypeormExtensionModule {
  static forRoot(options: TypeOrmExtensionOptions): DynamicModule {
    return {
      providers: [TypeormExtensionService],
      exports: [TypeormExtensionService],
      imports: [TypeOrmModule.forRoot(options)],
      module: TypeormExtensionModule,
    };
  }

  static forRootAsync(options: TypeORMExtensionAsyncOptions): DynamicModule {
    return {
      imports: options.imports,
      module: TypeormExtensionModule,
    };
  }
}
