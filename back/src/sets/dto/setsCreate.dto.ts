import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class setsCreateDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the workout',
  })
  @IsNumber()
  workoutId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the exercise',
  })
  @IsNumber()
  exerciseId: number;

  @ApiProperty({
    example: 10,
    description: 'The number of reps',
  })
  @IsNumber()
  reps: number;

  @ApiProperty({
    example: 50,
    description: 'The weight used in the exercise',
  })
  @IsNumber()
  weight: number;
}
