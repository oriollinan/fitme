import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class setsUpdateDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the set, NOT send on the body, taking route param',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the exercise',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  exerciseId?: number;

  @ApiProperty({
    example: 10,
    description: 'The number of reps performed in the set',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  reps?: number;

  @ApiProperty({
    example: 50,
    description: 'The weight lifted in the set',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  weight?: number;
}
