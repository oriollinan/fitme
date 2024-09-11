import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { PrismaDbService } from '../prisma-db/prisma-db.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('ExercisesService', () => {
  let service: ExercisesService;
  let prismaDbService: PrismaDbService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ExercisesService,
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
      ],
    }).compile();

    service = moduleRef.get<ExercisesService>(ExercisesService);
    prismaDbService = moduleRef.get<PrismaDbService>(PrismaDbService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaDbService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(configService).toBeDefined();
  });
});
