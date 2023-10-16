import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/shared/general.response.dto';
import { ErrorValidationResponseDto } from 'src/shared/error-validation.response.dto';
import { FindAllUserResponseDto } from './dto/find-all-response.dto';
import { NotFoundResponseDto } from 'src/shared/not-found.response.dto';
import { FindOneUserResponseDto } from './dto/find-one-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    description: 'Create a new User',
  })
  @ApiCreatedResponse({ type: ResponseDto })
  @ApiBadRequestResponse({ type: ErrorValidationResponseDto })
  @ApiBody({
    type: CreateUserDto,
    description: "User's create body",
    examples: {
      a: {
        summary: 'Create new User',
        value: {
          firstName: 'Heri',
          lastName: 'Hakim',
          email: 'heri@gmail.com',
          password: 'Password0)',
          phone: '085372996841',
          age: 30,
          gender: 'Male',
        } as CreateUserDto,
      },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: FindAllUserResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: FindOneUserResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(202)
  @ApiOperation({
    description: 'Update existing user or create a new one',
  })
  @ApiAcceptedResponse({ type: ResponseDto })
  @ApiBadRequestResponse({ type: ErrorValidationResponseDto })
  @ApiBody({
    type: UpdateUserDto,
    description: "User's update body",
    examples: {
      a: {
        summary: 'Update a User',
        value: {
          firstName: 'Heri',
          lastName: 'Hakim',
          email: 'heri@gmail.com',
          password: 'Password0)',
          phone: '085372996841',
          age: 30,
          gender: 'Male',
        } as UpdateUserDto,
      },
    },
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
