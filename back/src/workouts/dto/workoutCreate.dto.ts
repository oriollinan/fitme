import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class workoutCreateDto {
  @ApiProperty({
    example: 'Chest Day',
    description: 'The name of the workout',
  })
  @IsString()
  name: string;
}
