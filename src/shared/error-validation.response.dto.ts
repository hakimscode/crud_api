import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ErrorValidationResponseDto {
  @ApiProperty({ description: 'HTTP status code.' })
  @IsNotEmpty()
  @IsNumber()
  readonly statusCode: number;

  @ApiProperty({ description: 'Response message.' })
  @IsNotEmpty()
  @IsString()
  readonly error: string;

  @ApiProperty({ description: 'Response message.' })
  @IsNotEmpty()
  @IsString()
  readonly message: string[];

  constructor(statusCode: number, error: string, message: string[]) {
    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
  }
}
