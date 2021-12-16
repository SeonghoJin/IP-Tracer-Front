import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { constants } from './constants';
import { IpLookupHandler } from './ip-lookup-handler';
import { IpLookupProducers } from './ip-lookup-producers';

@Module({
  imports: [
    BullModule.registerQueue({
      name: constants.ipLookup,
    }),
  ],
  providers: [IpLookupHandler, IpLookupProducers],
  exports: [IpLookupProducers],
})
export class IpLookupModule {}
