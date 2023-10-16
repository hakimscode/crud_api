import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponseDto {
  @ApiProperty({ description: 'HTTP status code.' })
  @IsNotEmpty()
  @IsNumber()
  readonly statusCode: number;

  @ApiProperty({ description: 'Response message.' })
  @IsNotEmpty()
  @IsString()
  readonly message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
