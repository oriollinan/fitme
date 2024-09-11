import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth.register.dto';
import { AuthLoginDto } from './dto/auth.login.dto';
import { PrismaDbService } from '../prisma-db/prisma-db.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let prismaDbService: PrismaDbService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
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
      controllers: [AuthController],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    prismaDbService = moduleRef.get<PrismaDbService>(PrismaDbService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    configService = moduleRef.get<ConfigService>(ConfigService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('signUp', () => {
    it('should call authService.signUp() with the correct parameters', async () => {
      const authRegisterDto: AuthRegisterDto = {
        email: 'test@test.com',
        password: 'password',
        name: 'Test User',
      };
      const result = { accessToken: 'mockAccessToken' };

      jest.spyOn(authService, 'signUp').mockResolvedValueOnce(result);

      expect(await authController.signUp(authRegisterDto)).toBe(result);
      expect(authService.signUp).toHaveBeenCalledWith(authRegisterDto);
    });
  });

  describe('login', () => {
    it('should call authService.login() with the correct parameters', async () => {
      const authLoginDto: AuthLoginDto = {
        email: 'test@test.com',
        password: 'password',
      };
      const result = { accessToken: 'mockAccessToken' };

      jest.spyOn(authService, 'login').mockResolvedValueOnce(result);

      expect(await authController.login(authLoginDto)).toBe(result);
      expect(authService.login).toHaveBeenCalledWith(authLoginDto);
    });
  });
});
