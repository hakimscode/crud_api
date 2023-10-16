import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export class UserDto {
  @ApiProperty({ description: "User's id", required: true })
  @IsNotEmpty()
  @IsString()
  readonly id: number;

  @ApiProperty({ description: "User's first name", required: true })
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: "User's last name", required: false })
  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @ApiProperty({ description: "User's email address", required: true })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: "User's password", required: true })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  readonly password: string;

  @ApiProperty({ description: "User's phone number", required: true })
  @IsNotEmpty()
  @IsPhoneNumber('ID')
  readonly phone: string;

  @ApiProperty({ description: "User's age", required: false })
  @IsOptional()
  @IsNumber()
  readonly age?: number;

  @ApiProperty({
    description: "User's gender",
    enum: [Gender.Male, Gender.Female],
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEnum(Gender)
  readonly gender?: Gender;
}
