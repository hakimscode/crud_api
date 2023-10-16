import { InMemoryDBV1Entity } from '@nestjs-addons/in-memory-db';

export interface User extends InMemoryDBV1Entity {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phone: string;
  age?: number;
  gender?: string;
}
