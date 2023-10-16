import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  InMemoryDBV1Service,
  InjectInMemoryDBV1Service,
} from '@nestjs-addons/in-memory-db';
import { User } from './entities/user.entity';
import { ResponseDto } from 'src/shared/general.response.dto';
import { FindAllUserResponseDto } from './dto/find-all-response.dto';
import { FindOneUserResponseDto } from './dto/find-one-response.dto';
import { NotFoundResponseDto } from 'src/shared/not-found.response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectInMemoryDBV1Service('user')
    private readonly usersRepository: InMemoryDBV1Service<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password, phone, age, gender } =
      createUserDto;

    this.usersRepository.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      age,
      gender,
    });

    return new ResponseDto(HttpStatus.CREATED, 'User has been created');
  }

  findAll() {
    const users = this.usersRepository.getAll();

    if (users.length === 0) {
      const response = new NotFoundResponseDto(
        HttpStatus.NOT_FOUND,
        'User list is empty',
      );
      throw new HttpException(response, response.statusCode);
    }

    return new FindAllUserResponseDto(HttpStatus.OK, 'User list', users);
  }

  findOne(id: number) {
    const user = this.usersRepository.get(id);

    if (user === undefined) {
      const response = new NotFoundResponseDto(
        HttpStatus.NOT_FOUND,
        'User not found',
      );
      throw new HttpException(response, response.statusCode);
    }

    return new FindOneUserResponseDto(HttpStatus.OK, 'User found', user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const { firstName, lastName, email, password, phone, age, gender } =
      updateUserDto;

    this.usersRepository.update({
      id,
      firstName,
      lastName,
      email,
      password,
      phone,
      age,
      gender,
    });

    return new ResponseDto(
      HttpStatus.ACCEPTED,
      'User has been updated/created',
    );
  }

  remove(id: number) {
    const user = this.usersRepository.get(id);

    if (user === undefined) {
      const response = new NotFoundResponseDto(
        HttpStatus.NOT_FOUND,
        'User not found',
      );
      throw new HttpException(response, response.statusCode);
    }

    this.usersRepository.delete(id);
    return new ResponseDto(HttpStatus.OK, 'User has been deleted');
  }
}
