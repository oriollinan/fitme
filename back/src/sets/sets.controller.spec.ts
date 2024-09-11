import { Test, TestingModule } from '@nestjs/testing';
import { SetsController } from './sets.controller';
import { SetsService } from './sets.service';
import { PrismaDbService } from '../prisma-db/prisma-db.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Utils } from '../utils/middlewareHelper/middleware.utils';
import { WorkoutsService } from '../workouts/workouts.service';
import { ExercisesService } from '../exercises/exercises.service';

describe('SetsController', () => {
  let controller: SetsController;
  let service: SetsService;
  let prismaDbService: PrismaDbService;
  let jwtService: JwtService;
  let configService: ConfigService;
  let utils: Utils;
  let workoutsService: WorkoutsService;
  let exercisesService: ExercisesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SetsService,
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
      controllers: [SetsController],
    }).compile();

    service = moduleRef.get<SetsService>(SetsService);
    prismaDbService = moduleRef.get<PrismaDbService>(PrismaDbService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    configService = moduleRef.get<ConfigService>(ConfigService);
    controller = moduleRef.get<SetsController>(SetsController);
    utils = moduleRef.get<Utils>(Utils);
    workoutsService = moduleRef.get<WorkoutsService>(WorkoutsService);
    exercisesService = moduleRef.get<ExercisesService>(ExercisesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(prismaDbService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(configService).toBeDefined();
    expect(utils).toBeDefined();
    expect(workoutsService).toBeDefined();
    expect(exercisesService).toBeDefined();
  });
});
