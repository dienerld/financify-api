import { User } from '../core/entities';
import { UserRepository } from '../core/interfaces';

export class UserRepositoryMock implements UserRepository {
  private users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User | null> {
    return this.users.find((user) => user.getId() === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.getEmail() === email) || null;
  }
}
