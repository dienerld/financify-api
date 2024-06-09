import { Prisma, PrismaClient } from '@prisma/client';

import { UserRepository } from '../../core/interfaces';
import { User } from '../../core/entities';
import { PersistenceNotFoundException } from '@/database/exception/client.exception';

export class PrismaUserRepository implements UserRepository {
  private readonly repository: PrismaClient['user'];

  constructor(client: PrismaClient) {
    this.repository = client.user;
  }

  async save(user: User): Promise<void> {
    const serialized = user.toJSON();
    const password = user.getPassword();
    await this.repository.create({
      data: {
        ...serialized,
        password,
      },
    });
  }

  async list(): Promise<User[]> {
    const users = await this.repository.findMany();
    return users.map(this.mapToEntity);
  }

  async findOne(value: string): Promise<User> {
    const user = await this.repository.findUnique({
      where: { id: value },
    });

    if (!user) {
      throw new PersistenceNotFoundException('User not found');
    }

    return this.mapToEntity(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return this.mapToEntity(user);
  }

  private mapToEntity(user: Prisma.UserGetPayload<{}>): User {
    return User.createFrom({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      disabled: user.disabled,
      excluded: user.excluded,
      blocked: user.blocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      excludedAt: user.excludedAt || undefined,
    });
  }
}
