import { Module } from '@nestjs/common';
import { Utils } from './middlewareHelper/index';

@Module({
  providers: [Utils],
  exports: [Utils],
})
export class UtilsModule {}
