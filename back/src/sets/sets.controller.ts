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
import { validate } from 'class-validator';
import { Utils } from '../utils/middlewareHelper';
import { SetsService } from './sets.service';
import { setsCreateDto, setsUpdateDto } from './dto';
import { WorkoutsService } from '../workouts/workouts.service';
import { ExercisesService } from '../exercises/exercises.service';
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('sets')
@Controller('sets')
export class SetsController {
  constructor(
    private setsService: SetsService,
    private workoutService: WorkoutsService,
    private exerciseService: ExercisesService,
    private utils: Utils,
  ) {}

  @ApiCreatedResponse({
    description: 'The set has been successfully created.',
    schema: {
      properties: {
        id: { type: 'number', example: 4 },
        exerciseId: { type: 'number', example: 1 },
        workoutId: { type: 'number', example: 1 },
        reps: { type: 'number', example: 12 },
        weight: { type: 'number', example: 70 },
        date: { type: 'string', example: '2023-03-25T17:29:57.231Z' },
        setId: { type: 'number', example: 4 },
        workoutPlanId: { type: 'number', example: 1 },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'An error happened while retrieving information.',
  })
  @ApiBody({ type: setsCreateDto })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createWorkout(@Req() req: Request, @Body() rawBody: setsCreateDto) {
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
    if (!this.workoutService.getWorkout(userId, rawBody.workoutId)) {
      throw new BadRequestException('Workout does not exist');
    }
    if (
      !(await this.exerciseService.getArrayExerciseId()).includes(
        rawBody.exerciseId,
      )
    ) {
      throw new BadRequestException('Exercise does not exist');
    }
    return await this.setsService.createSet(rawBody);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'The sets were successfully retrieved.',
    schema: {
      properties: {
        sets: {
          type: 'array',
          example: {
            id: 3,
            reps: 6,
            weight: 80,
            date: '2023-03-25T17:29:57.231Z',
            exerciseId: 1,
            workoutId: 1,
          },
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'An error happened while retrieving information.',
  })
  @ApiParam({
    name: 'exerciseId',
    example: '1',
    description: 'The ID of the exercise to get sets for.',
  })
  @Get('/:exerciseId')
  async getSets(
    @Req() req: Request,
    @Param('exerciseId') exerciseToSearch: string,
  ) {
    const user = this.utils.extractUserJwtMiddleware(req);
    const userId = user ? parseInt(user['sub'] as string) : null;
    const exerciseId = parseInt(exerciseToSearch.substring(1), 10);

    if (exerciseId.toString() === 'NaN') {
      throw new BadRequestException('Exercise does not exist');
    }
    if (userId == null)
      throw new ForbiddenException(
        'An error happend while retrieving information.',
      );
    return await this.setsService.getSets(userId, exerciseId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'The set has been successfully created.',
    schema: {
      properties: {
        id: { type: 'number', example: 4 },
        exerciseId: { type: 'number', example: 1 },
        workoutId: { type: 'number', example: 1 },
        reps: { type: 'number', example: 12 },
        weight: { type: 'number', example: 70 },
        date: { type: 'string', example: '2023-03-25T17:29:57.231Z' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Set does not exist or validation error.',
  })
  @ApiForbiddenResponse({
    description: 'An error happened while retrieving information.',
  })
  @ApiParam({
    name: 'id',
    example: '1',
    description: 'The ID of the set to update.',
  })
  @ApiBody({ type: setsUpdateDto })
  @Patch('/:id')
  async updateSet(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() rawBody: setsUpdateDto,
  ) {
    const user = this.utils.extractUserJwtMiddleware(req);
    const userId = user ? parseInt(user['sub'] as string) : null;
    const setId = parseInt(id.substring(1), 10);
    const errors = await validate(rawBody);

    if (setId.toString() === 'NaN') {
      throw new BadRequestException('Set does not exist');
    }
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    if (userId == null)
      throw new ForbiddenException(
        'An error happend while retrieving information.',
      );
    if (!(await this.setsService.checkSetFromUsersWorkouts(userId, setId))) {
      throw new BadRequestException('Set does not exist');
    }
    return await this.setsService.updateSet({ ...rawBody, id: setId });
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'The set has been successfully deleted.' })
  @ApiBadRequestResponse({ description: 'Set does not exist.' })
  @ApiForbiddenResponse({
    description: 'An error happened while retrieving information.',
  })
  @ApiParam({
    name: 'id',
    example: '1',
    description: 'The ID of the set to delete.',
  })
  @Delete('/:id')
  async deleteSet(@Req() req: Request, @Param('id') id: string) {
    const user = this.utils.extractUserJwtMiddleware(req);
    const userId = user ? parseInt(user['sub'] as string) : null;
    const setId = parseInt(id.substring(1), 10);

    if (setId.toString() === 'NaN') {
      throw new BadRequestException('Set does not exist');
    }
    if (userId == null)
      throw new ForbiddenException(
        'An error happend while retrieving information.',
      );
    if (!(await this.setsService.checkSetFromUsersWorkouts(userId, setId))) {
      throw new BadRequestException('Set does not exist');
    }
    return await this.setsService.deleteSet(setId);
  }
}
