import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth.register.dto';
import { AuthLoginDto } from './dto/auth.login.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: AuthRegisterDto })
  @ApiCreatedResponse({
    description: 'The access token of the logged in user.',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'No task found for ID' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while registering the user.',
  })
  @Post('signup')
  @UsePipes(new ValidationPipe())
  signUp(@Body() dto: AuthRegisterDto) {
    return this.authService.signUp(dto);
  }

  // /auth/login
  @ApiOperation({ summary: 'Login an existing user' })
  @ApiBody({ type: AuthLoginDto })
  @ApiCreatedResponse({
    description: 'The access token of the logged in user.',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'No task found for ID' })
  @ApiInternalServerErrorResponse({
    description: 'An error occurred while logging in the user.',
  })
  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto);
  }
}
