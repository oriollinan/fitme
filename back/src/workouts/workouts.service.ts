import { Injectable } from '@nestjs/common';
import { PrismaDbService } from '../prisma-db/prisma-db.service';
import { workoutCreateDto } from './dto';

@Injectable()
export class WorkoutsService {
  constructor(private prismaService: PrismaDbService) {}

  async createWorkout(userId: number, dto: workoutCreateDto) {
    const workout = await this.prismaService.workoutPlan.create({
      data: {
        name: dto.name,
        userId,
      },
    });
    delete workout.userId;
    return workout;
  }

  async getWorkouts(userId: number) {
    const workouts = await this.prismaService.workoutPlan.findMany({
      where: {
        userId,
      },
      include: {
        Set: true,
      },
    });
    workouts.map((workout) => delete workout.userId);
    return { workouts: workouts };
  }

  async getWorkout(userId: number, workoutId: number) {
    const workout = await this.prismaService.workoutPlan.findFirst({
      where: {
        id: workoutId,
        userId,
      },
      include: {
        Set: true,
      },
    });
    if (!workout) return null;
    delete workout.userId;
    return workout;
  }

  async getWorkoutDate(workoutId: number) {
    return this.prismaService.workoutPlan.findFirst({
      where: { id: workoutId },
      select: { date: true },
    });
  }

  async updateWorkout(workoutId: number, name: string) {
    return await this.prismaService.workoutPlan.update({
      where: {
        id: workoutId,
      },
      data: {
        name,
      },
    });
  }

  async deleteWorkout(workoutId: number) {
    return await this.prismaService.workoutPlan.delete({
      where: {
        id: workoutId,
      },
    });
  }
}
