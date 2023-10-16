import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InMemoryDBV1Module } from '@nestjs-addons/in-memory-db';
import { userProviders } from './users.provider';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { NotFoundResponseDto } from 'src/shared/not-found.response.dto';

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryDBV1Module.forFeature('user')],
      providers: [UsersService, ...userProviders],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
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
      userService.create(newUser);

      const user = userService.findOne(1);
      expect(user.user).not.toBeUndefined();
      expect(user.user.firstName).toBe(newUser.firstName);
      expect(user.user.lastName).toBe(newUser.lastName);
      expect(user.user.email).toBe(newUser.email);
      expect(user.user.password).toBe(newUser.password);
      expect(user.user.phone).toBe(newUser.phone);
      expect(user.user.age).toBe(newUser.age);
      expect(user.user.gender).toBe(newUser.gender);
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
      userService.create(newUser);
    });

    it('should find a user', () => {
      const user = userService.findOne(1);
      expect(user.user).not.toBeUndefined();
      expect(user.user.firstName).toBe(newUser.firstName);
      expect(user.user.lastName).toBe(newUser.lastName);
      expect(user.user.email).toBe(newUser.email);
      expect(user.user.password).toBe(newUser.password);
      expect(user.user.phone).toBe(newUser.phone);
      expect(user.user.age).toBe(newUser.age);
      expect(user.user.gender).toBe(newUser.gender);
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
        userService.create(user);
      }
    });

    it('should find all user', () => {
      const users = userService.findAll();
      expect(users.user).not.toBeUndefined();
      expect(users.user).toHaveLength(2);

      for (let i = 0; i < users.user.length; i++) {
        expect(users.user[i].firstName).toBe(newUser[i].firstName);
        expect(users.user[i].lastName).toBe(newUser[i].lastName);
        expect(users.user[i].email).toBe(newUser[i].email);
        expect(users.user[i].password).toBe(newUser[i].password);
        expect(users.user[i].phone).toBe(newUser[i].phone);
        expect(users.user[i].age).toBe(newUser[i].age);
        expect(users.user[i].gender).toBe(newUser[i].gender);
      }
    });
  });

  describe('update user', () => {
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
      userService.create(newUser);
    });

    it('should update a user', () => {
      const updateBody: UpdateUserDto = {
        firstName: 'Heri Edit',
        lastName: 'Hakim Edit',
        email: 'heri_edit@gmail.com',
        password: 'PasswordEdit0)',
        phone: '085372996842',
        age: 29,
        gender: 'Female',
      };
      userService.update(1, updateBody);

      const user = userService.findOne(1);
      expect(user.user).not.toBeUndefined();
      expect(user.user.firstName).toBe(updateBody.firstName);
      expect(user.user.lastName).toBe(updateBody.lastName);
      expect(user.user.email).toBe(updateBody.email);
      expect(user.user.password).toBe(updateBody.password);
      expect(user.user.phone).toBe(updateBody.phone);
      expect(user.user.age).toBe(updateBody.age);
      expect(user.user.gender).toBe(updateBody.gender);
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
      userService.create(newUser);
    });

    it('should delete a user', () => {
      userService.remove(1);

      try {
        userService.findOne(1);
      } catch (err) {
        expect(err).toEqual(
          new HttpException(
            new NotFoundResponseDto(HttpStatus.NOT_FOUND, 'User not found'),
            404,
          ),
        );
      }
    });
  });
});
