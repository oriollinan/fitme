import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaDbService } from '../prisma-db/prisma-db.service';
import { AuthRegisterDto } from './dto/auth.register.dto';
import { AuthLoginDto } from './dto/auth.login.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaDbService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthRegisterDto) {
    // find the user email in the db
    const userExist = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if its not found throw an error
    if (userExist) {
      throw new ForbiddenException('Email already in use, try login in.');
    }
    // generate a hash password
    const pwdHashed = await argon.hash(dto.password);

    // save the user in the database
    const user = await this.prismaService.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: pwdHashed,
      },
    });
    // return the user created
    return this.signToken(user['id'], user['email']);
  }

  async login(dto: AuthLoginDto) {
    // find the user email in the db
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if its not found throw an error
    if (!user) {
      throw new ForbiddenException('Incorrect email or password');
    }

    // compare both passwords and throw an error if not same
    const pwdExists = await argon.verify(user['password'], dto.password);
    if (!pwdExists) {
      throw new ForbiddenException('Incorrect email or password');
    }

    // send back the user
    return this.signToken(user['id'], user['email']);
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    return {
      accessToken: await this.jwt.signAsync(payload, {
        expiresIn: '1h',
        secret: this.config.get('JWT_SECRET'),
      }),
    };
  }
}
