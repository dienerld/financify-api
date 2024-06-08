import { User } from '../entities';

export interface UserRepository {
  save(user: User): Promise<void>;
  list(): Promise<User[]>;
  findOne(value: string | number): Promise<User>;
}

export const UserRepositoryKey = Symbol('USER_REPOSITORY');
