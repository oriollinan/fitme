import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UserUpdateDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  height?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  weight?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  body_fat?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  muscle_mass?: number;
}
