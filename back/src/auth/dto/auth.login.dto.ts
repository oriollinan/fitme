import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
