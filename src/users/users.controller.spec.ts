import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { InMemoryDBV1Module } from '@nestjs-addons/in-memory-db';
import { userProviders } from './users.provider';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let userController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryDBV1Module.forFeature('user')],
      controllers: [UsersController],
      providers: [UsersService, ...userProviders],
    }).compile();

    userController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('insert user', () => {
    it('should create a new user', () => {
      const newUser: CreateUserDto = {
        firstName: 'Heri',
        lastName: 'Hakim',
        email: 'heri@gmail.com',
        password: 'Password0)',
        phone: '085372996841',
        age: 30,
        gender: 'Male',
      };

      const response = userController.create(newUser);

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
      expect(response.message).toEqual('User has been created');
    });

    it('should error create invalid email user', async () => {
      const newUser: CreateUserDto = {
        firstName: 'Heri',
        lastName: 'Hakim',
        email: 'heri',
        password: 'Password0)',
        phone: '085372996841',
        age: 30,
        gender: 'Male',
      };
      const myDtoObject = plainToInstance(CreateUserDto, newUser);
      const errors = await validate(myDtoObject);
      expect(errors).not.toHaveLength(0);
      expect(errors[0].constraints).toEqual({
        isEmail: 'email must be an email',
      });
    });
  });

  describe('update user', () => {
    it('should update a user', () => {
      const user: UpdateUserDto = {
        firstName: 'Heri',
        lastName: 'Hakim',
        email: 'heri@gmail.com',
        password: 'Password0)',
        phone: '085372996841',
        age: 30,
        gender: 'Male',
      };

      const response = userController.update('1', user);

      expect(response.statusCode).toEqual(HttpStatus.ACCEPTED);
      expect(response.message).toEqual('User has been updated/created');
    });

    it('should error update invalid email user', async () => {
      const newUser: UpdateUserDto = {
        firstName: 'Heri',
        lastName: 'Hakim',
        email: 'heri',
        password: 'Password0)',
        phone: '085372996841',
        age: 30,
        gender: 'Male',
      };
      const myDtoObject = plainToInstance(UpdateUserDto, newUser);
      const errors = await validate(myDtoObject);
      expect(errors).not.toHaveLength(0);
      expect(errors[0].constraints).toEqual({
        isEmail: 'email must be an email',
      });
    });
  });

  describe('find all user', () => {
    const newUser: CreateUserDto[] = [];
    beforeEach(() => {
      newUser.push({
        firstName: 'Heri',
        lastName: 'Hakim',
        email: 'heri@gmail.com',
        password: 'Password0)',
        phone: '085372996841',
        age: 30,
        gender: 'Male',
      });

      newUser.push({
        firstName: 'Hakim',
        lastName: 'Setiawan',
        email: 'setiawan@gmail.com',
        password: 'Password0)',
        phone: '085372996842',
        age: 29,
        gender: 'Female',
      });

      for (const user of newUser) {
        userController.create(user);
      }
    });

    it('should get all user', () => {
      const response = userController.findAll();

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.message).toEqual('User list');
      expect(response.user).toHaveLength(2);
    });
  });

  describe('find one user', () => {
    let newUser: CreateUserDto;
    beforeEach(() => {
      newUser = {
        firstName: 'Heri',
        lastName: 'Hakim',
        email: 'heri@gmail.com',
        password: 'Password0)',
        phone: '085372996841',
        age: 30,
        gender: 'Male',
      };
      userController.create(newUser);
    });

    it('should get all user', () => {
      const response = userController.findOne('1');

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.message).toEqual('User found');
      expect(response.user.firstName).toBe(newUser.firstName);
      expect(response.user.lastName).toBe(newUser.lastName);
      expect(response.user.email).toBe(newUser.email);
      expect(response.user.password).toBe(newUser.password);
      expect(response.user.phone).toBe(newUser.phone);
      expect(response.user.age).toBe(newUser.age);
      expect(response.user.gender).toBe(newUser.gender);
    });
  });

  describe('delete user', () => {
    let newUser: CreateUserDto;
    beforeEach(() => {
      newUser = {
        firstName: 'Heri',
        lastName: 'Hakim',
        email: 'heri@gmail.com',
        password: 'Password0)',
        phone: '085372996841',
        age: 30,
        gender: 'Male',
      };
      userController.create(newUser);
    });

    it('should get all user', () => {
      const response = userController.remove('1');

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.message).toEqual('User has been deleted');
    });
  });
});
