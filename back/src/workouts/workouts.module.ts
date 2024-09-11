import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  imports: [UtilsModule],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
