import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { constants } from './constants';
import { IpLookupConsumer } from './ip-lookup-consumer';
import { IpLookupProducer } from './ip-lookup-producer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: constants.IP_LOOK_UP,
    }),
  ],
  providers: [IpLookupConsumer, IpLookupProducer],
  exports: [IpLookupProducer],
})
export class IpLookupModule {}
