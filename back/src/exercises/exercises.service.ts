import { Injectable } from '@nestjs/common';
import { PrismaDbService } from '../prisma-db/prisma-db.service';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaDbService) {}

  async getExercisesFromBodyId(bodyId: number) {
    const exercises = await this.prisma.exercise.findMany({
      where: { bodyPartId: bodyId },
    });
    const bodyPart = await this.getBodyPartFromId(bodyId);
    exercises.map((item) => {
      delete item.bodyPartId;
    });
    return { [bodyPart.name]: exercises };
  }

  async checkExerciseIdExists(exerciseId: number) {
    const exist = this.prisma.exercise.findFirst({
      where: { id: exerciseId },
    });
    return exist ? true : false;
  }

  async checkBodyPartIdExists(bodyId: number) {
    const exist = this.prisma.bodyPart.findFirst({
      where: { id: bodyId },
    });
    return exist ? true : false;
  }

  async getBodyPartFromId(bodyId) {
    return this.prisma.bodyPart.findFirst({
      where: { id: bodyId },
      select: { name: true },
    });
  }

  async getArrayExerciseId() {
    return this.prisma.exercise
      .findMany({
        select: { id: true },
      })
      .then((result) => {
        return result.map((item) => item.id);
      });
  }

  async getNameFromExerciseId(id: number) {
    return this.prisma.exercise.findFirst({
      where: { id: id },
      select: { name: true },
    });
  }

  async getAllExercises() {
    return this.prisma.exercise.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        bodyPart: { select: { name: true } },
      },
    });
  }
}
