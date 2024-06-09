import { User } from '../entities';

export interface UserRepository {
  save(user: User): Promise<void>;
  list(): Promise<User[]>;
  findOne(id: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

export const UserRepositoryKey = Symbol('USER_REPOSITORY');
