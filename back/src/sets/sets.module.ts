import { Module } from '@nestjs/common';
import { SetsController } from './sets.controller';
import { SetsService } from './sets.service';
import { UtilsModule } from 'src/utils/utils.module';
import { WorkoutsModule } from 'src/workouts/workouts.module';
import { ExercisesModule } from 'src/exercises/exercises.module';

@Module({
  controllers: [SetsController],
  providers: [SetsService],
  imports: [UtilsModule, WorkoutsModule, ExercisesModule],
})
export class SetsModule {}
