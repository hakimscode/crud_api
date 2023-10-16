import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

@Module({
  imports: [UsersModule, InMemoryDBModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
