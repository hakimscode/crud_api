import { InMemoryDBV1Service } from '@nestjs-addons/in-memory-db';
import { User } from './entities/user.entity';

export const userProviders = [
  {
    provide: 'user',
    useValue: InMemoryDBV1Service<User>,
  },
];
