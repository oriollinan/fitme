import { Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as jwts from 'jsonwebtoken';

export class Utils {
  constructor(private jwt: JwtService) {}

  extractUserJwtMiddleware(@Req() req: Request) {
    const authorization = req.headers;
    const token = authorization
      ? authorization['authorization'].split(' ')[1]
      : undefined;
    return token ? jwts.decode(token) : undefined;
  }
}
