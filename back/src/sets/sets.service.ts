import { Injectable } from '@nestjs/common';
import { PrismaDbService } from '../prisma-db/prisma-db.service';
import { WorkoutsService } from '../workouts/workouts.service';
import { setsUpdateDto } from './dto';
import { setsCreateDto } from './dto/setsCreate.dto';

@Injectable()
export class SetsService {
  constructor(
    private workoutService: WorkoutsService,
    private prismaService: PrismaDbService,
  ) {}

  async createSet(dto: setsCreateDto) {
    const date = await this.workoutService.getWorkoutDate(dto.workoutId);

    const set = await this.prismaService.set.create({
      data: {
        reps: dto.reps,
        weight: dto.weight,
        date: date.date,
        workoutId: dto.workoutId,
        exerciseId: dto.exerciseId,
      },
    });
    const setWorkout = await this.prismaService.workout_Set.create({
      data: {
        workoutPlanId: dto.workoutId,
        setId: set.id,
      },
    });
    return { ...set, ...setWorkout };
  }

  async getSets(userId: number, exerciseId: number) {
    return await this.prismaService.set
      .findMany({
        where: {
          workout: {
            userId: userId,
          },
          exerciseId: exerciseId,
        },
      })
      .then((result) => {
        return { sets: result };
      });
  }

  async checkSetFromUsersWorkouts(userId: number, setId: number) {
    return await this.prismaService.set.findFirst({
      where: {
        id: setId,
        workout: {
          userId: userId,
        },
      },
    });
  }

  async updateSet(dto: setsUpdateDto) {
    return await this.prismaService.set.update({
      where: {
        id: dto.id,
      },
      data: {
        exerciseId: dto.exerciseId,
        reps: dto.reps,
        weight: dto.weight,
      },
    });
  }

  async deleteSet(id: number) {
    return await this.prismaService.set.delete({
      where: {
        id: id,
      },
    });
  }
}
