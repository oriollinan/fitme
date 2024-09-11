import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Utils } from '../utils/middlewareHelper';
import { workoutCreateDto } from './dto';
import { validate } from 'class-validator';
import { WorkoutsService } from './workouts.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('workouts')
@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService, private utils: Utils) {}

  @ApiBearerAuth()
  @ApiBody({ type: workoutCreateDto })
  @ApiCreatedResponse({
    description: 'The workout has been successfully created.',
    schema: {
      properties: {
        id: { type: 'number', example: 4 },
        name: { type: 'string', example: 'Chest Day' },
        date: { type: 'string', example: '2023-03-25T17:29:57.231Z' },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createWorkout(@Req() req: Request, @Body() rawBody: workoutCreateDto) {
    const user = this.utils.extractUserJwtMiddleware(req);
    const userId = user ? parseInt(user['sub'] as string) : null;
    const errors = await validate(rawBody);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    if (userId == null) {
      throw new ForbiddenException(
        'An error happend while retrieving information.',
      );
    }
    return await this.workoutsService.createWorkout(userId, rawBody);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The workouts have been successfully retrieved.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({
    description: 'An error happend while retrieving information',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getWorkouts(@Req() req: Request) {
    const user = this.utils.extractUserJwtMiddleware(req);
    const userId = user ? parseInt(user['sub'] as string) : null;

    if (userId == null)
      throw new ForbiddenException(
        'An error happend while retrieving information.',
      );
    return await this.workoutsService.getWorkouts(userId);
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOkResponse({
    description: 'The workout has been successfully retrieved.',
    schema: {
      properties: {
        id: { type: 'number', example: 4 },
        name: { type: 'string', example: 'Chest Day' },
        date: { type: 'string', example: '2023-03-25T17:29:57.231Z' },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getWorkout(@Req() req: Request, @Param('id') workoutId: string) {
    const user = this.utils.extractUserJwtMiddleware(req);
    const userId = user ? parseInt(user['sub'] as string) : null;
    const workoutIdNumber = parseInt(workoutId.substring(1), 10);

    if (workoutIdNumber.toString() === 'NaN') {
      throw new BadRequestException('Workout does not exist');
    }
    if (userId == null)
      throw new ForbiddenException(
        'An error happend while retrieving information.',
      );
    const exist = await this.workoutsService.getWorkout(
      userId,
      workoutIdNumber,
    );
    if (!exist) throw new BadRequestException('Workout does not exist');
    return exist;
  }

  @ApiBearerAuth()
  @ApiBody({ type: workoutCreateDto })
  @ApiCreatedResponse({
    description: 'The workout has been successfully created.',
    schema: {
      properties: {
        id: { type: 'number', example: 4 },
        name: { type: 'string', example: 'Chest Day' },
        date: { type: 'string', example: '2023-03-25T17:29:57.231Z' },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({
    description: 'An error happend while retrieving information',
  })
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  async updateWorkout(
    @Req() req: Request,
    @Param('id') workoutId: string,
    @Body('name') name: string,
  ) {
    const user = this.utils.extractUserJwtMiddleware(req);
    const userId = user ? parseInt(user['sub'] as string) : null;
    const workoutIdNumber = parseInt(workoutId.substring(1), 10);

    if (workoutIdNumber.toString() === 'NaN') {
      throw new BadRequestException('Workout does not exist');
    }
    if (userId == null)
      throw new ForbiddenException(
        'An error happend while retrieving information.',
      );
    const exist = await this.workoutsService.getWorkout(
      userId,
      workoutIdNumber,
    );
    if (!exist) throw new BadRequestException('Workout does not exist');
    return await this.workoutsService.updateWorkout(workoutIdNumber, name);
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOkResponse({
    description: 'The workout has been successfully retrieved.',
  })
  @ApiBadRequestResponse({ description: 'Workout does not exist' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({
    description: 'An error happend while retrieving information',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteWorkout(@Req() req: Request, @Param('id') workoutId: string) {
    const user = this.utils.extractUserJwtMiddleware(req);
    const userId = user ? parseInt(user['sub'] as string) : null;
    const workoutIdNumber = parseInt(workoutId.substring(1), 10);

    if (workoutIdNumber.toString() === 'NaN') {
      throw new BadRequestException('Workout does not exist');
    }
    if (userId == null)
      throw new ForbiddenException(
        'An error happend while retrieving information.',
      );
    const exist = await this.workoutsService.getWorkout(
      userId,
      workoutIdNumber,
    );
    if (!exist) throw new BadRequestException('Workout does not exist');
    return await this.workoutsService.deleteWorkout(workoutIdNumber);
  }
}
