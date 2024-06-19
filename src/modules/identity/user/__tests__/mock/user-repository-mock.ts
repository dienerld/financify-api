import { User } from '../core/entities';
import { UserRepository } from '../core/interfaces';

export class UserRepositoryMock implements UserRepository {
  static users: User[] = [];

  async save(user: User): Promise<void> {
    UserRepositoryMock.users.push(user);
  }

  async list(): Promise<User[]> {
    return UserRepositoryMock.users;
  }

  async findOne(id: string): Promise<User | null> {
    return UserRepositoryMock.users.find((user) => user.getId() === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return (
      UserRepositoryMock.users.find((user) => user.getEmail() === email) || null
    );
  }
}
