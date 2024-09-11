import { Test } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { PrismaDbService } from '../prisma-db/prisma-db.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { AuthController } from './auth.controller';

describe('AuthService', () => {
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
  });

  describe('signUp', () => {
    it('should create a new user when provided with valid data', async () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
        height: null,
        weight: null,
        body_fat: null,
        muscle_mass: null,
      };
      jest
        .spyOn(prismaDbService.user, 'findUnique')
        .mockResolvedValueOnce(null);
      jest.spyOn(argon, 'hash').mockResolvedValueOnce(mockUser.password);
      jest
        .spyOn(prismaDbService.user, 'create')
        .mockResolvedValueOnce(mockUser);
      jest
        .spyOn(authService, 'signToken')
        .mockResolvedValueOnce({ accessToken: 'mockAccessToken' });

      const registerDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };
      const result = await authService.signUp(registerDto);

      expect(result).toEqual({ accessToken: 'mockAccessToken' });
      expect(prismaDbService.user.findUnique).toHaveBeenCalledWith({
        where: { email: registerDto.email },
      });
      expect(prismaDbService.user.create).toHaveBeenCalledWith({
        data: {
          name: registerDto.name,
          email: registerDto.email,
          password: mockUser.password,
        },
      });
      expect(authService.signToken).toHaveBeenCalledWith(
        mockUser.id,
        mockUser.email,
      );
    });

    it('should throw an error when user already exists', async () => {
      jest.spyOn(prismaDbService.user, 'findUnique').mockResolvedValueOnce({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
        height: null,
        weight: null,
        body_fat: null,
        muscle_mass: null,
      });
      const registerDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };
      try {
        await authService.signUp(registerDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(error.message).toBe('Email already in use, try login in.');
      }
      expect(prismaDbService.user.findUnique).toHaveBeenCalledWith({
        where: { email: registerDto.email },
      });
    });
  });

  describe('login', () => {
    it('should return an access token when valid', async () => {
      jest.spyOn(prismaDbService.user, 'findUnique').mockResolvedValueOnce({
        id: 2,
        name: 'Test User',
        email: 'test@example.com',
        password: await argon.hash('test-password'),
        height: null,
        weight: null,
        body_fat: null,
        muscle_mass: null,
      });
      jest
        .spyOn(authService, 'signToken')
        .mockResolvedValueOnce({ accessToken: 'mockAccessToken' });
      const result = await authService.login({
        email: 'test@example.com',
        password: 'test-password',
      });
      expect(result).toBeDefined();
      expect(result.accessToken).toBeDefined();
    });

    it('should throw a ForbiddenException when given invalid credentials', async () => {
      jest
        .spyOn(prismaDbService.user, 'findUnique')
        .mockResolvedValueOnce(null);
      const loginDto = {
        email: 'invalid-email@example.com',
        password: 'invalid-password',
      };
      await expect(authService.login(loginDto)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
