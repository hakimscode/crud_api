import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryDBV1Module } from '@nestjs-addons/in-memory-db';
import { userProviders } from './users.provider';

@Module({
  imports: [InMemoryDBV1Module.forFeature('user')],
  controllers: [UsersController],
  providers: [UsersService, ...userProviders],
})
export class UsersModule {}
