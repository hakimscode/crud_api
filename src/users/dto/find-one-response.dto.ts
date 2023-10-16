import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ResponseDto } from 'src/shared/general.response.dto';
import { UserDto } from './user-dto';
import { User } from '../entities/user.entity';

export class FindOneUserResponseDto extends ResponseDto {
  @ApiProperty({
    description: 'User profile.',
    type: UserDto,
  })
  @IsNotEmpty()
  readonly user: User;

  constructor(statusCode: number, message: string, user: User) {
    super(statusCode, message);
    this.user = user;
  }
}
