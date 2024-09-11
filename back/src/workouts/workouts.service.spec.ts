import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { PrismaDbService } from '../prisma-db/prisma-db.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Utils } from '../utils/middlewareHelper/middleware.utils';
import { ExercisesService } from '../exercises/exercises.service';

describe('WorkoutsController', () => {
  let controller: WorkoutsController;
  let service: WorkoutsService;
  let prismaDbService: PrismaDbService;
  let jwtService: JwtService;
  let configService: ConfigService;
  let utils: Utils;
  let exercisesService: ExercisesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        WorkoutsService,
        {
          provide: PrismaDbService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: Utils,
          useValue: {
            extractUserJwtMiddleware: jest.fn(),
          },
        },
        {
          provide: WorkoutsService,
          useValue: {
            getWorkoutById: jest.fn(),
          },
        },
        {
          provide: ExercisesService,
          useValue: {
            getExerciseById: jest.fn(),
          },
        },
      ],
      controllers: [WorkoutsController],
    }).compile();

    service = moduleRef.get<WorkoutsService>(WorkoutsService);
    prismaDbService = moduleRef.get<PrismaDbService>(PrismaDbService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    configService = moduleRef.get<ConfigService>(ConfigService);
    controller = moduleRef.get<WorkoutsController>(WorkoutsController);
    utils = moduleRef.get<Utils>(Utils);
    exercisesService = moduleRef.get<ExercisesService>(ExercisesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(prismaDbService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(configService).toBeDefined();
    expect(utils).toBeDefined();
    expect(exercisesService).toBeDefined();
  });
});
