import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ExercisesService } from './exercises.service';

@ApiBearerAuth()
@ApiTags('exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private exerciseService: ExercisesService) {}

  @ApiOperation({ summary: 'Get exercises by body part ID' })
  @ApiParam({
    name: 'bodyId',
    required: true,
    type: 'integer',
    description: 'The ID of the body part to get exercises for',
  })
  @ApiOkResponse({
    description: 'The exercises for the specified body part',
    schema: {
      properties: {
        Arms: {
          type: 'array',
          example: [
            {
              id: 15,
              name: 'Bicep curls',
              description:
                'Isolation exercise for the biceps. Grasp dumbbells with an underhand grip and curl them upward to the shoulders.',
            },
          ],
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'The exercises you requested are not accessible.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('/:bodyId')
  async getExercises(@Param('bodyId') bodyId: string) {
    const bodyIdNumber =
      bodyId[0] === ':'
        ? parseInt(bodyId.substring(1), 10)
        : parseInt(bodyId, 10);

    if (
      isNaN(bodyIdNumber) ||
      !(await this.exerciseService.checkBodyPartIdExists(bodyIdNumber))
    ) {
      throw new ForbiddenException(
        'The exercises you requested are not accessible.',
      );
    }
    return await this.exerciseService.getExercisesFromBodyId(bodyIdNumber);
  }

  @ApiOperation({ summary: 'Get exercises name by Id' })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
    description: 'The ID of the exercise to get exercises for',
  })
  @ApiOkResponse({
    description: 'The exercises for the specified body part',
    schema: {
      properties: {
        name: {
          type: 'string',
          example: 'Bench Press',
        },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'The exercises you requested are not accessible.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('name/:id')
  async getExerciseNameFromId(@Param('id') id: string) {
    const IdNumber =
      id[0] === ':' ? parseInt(id.substring(1), 10) : parseInt(id, 10);

    if (
      isNaN(IdNumber) ||
      !(await this.exerciseService.checkExerciseIdExists(IdNumber))
    ) {
      throw new ForbiddenException(
        'The exercises you requested are not accessible.',
      );
    }
    return await this.exerciseService.getNameFromExerciseId(IdNumber);
  }

  @ApiOperation({ summary: 'Get all exercises' })
  @ApiOkResponse({
    description: 'The exercises for the specified body part',
    schema: {
      properties: {
        id: {
          type: 'number',
          example: 1,
        },
        name: {
          type: 'string',
          example: 'Bench Press',
        },
        description: {
          type: 'string',
          example:
            'Isolation exercise for the biceps. Grasp dumbbells with an underhand grip and curl them upward to the shoulders.',
        },
        bodyPart: {
          type: 'object',
          example: {
            name: 'Chest',
          },
        },
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllExercises() {
    return await this.exerciseService.getAllExercises();
  }
}
