import { PrismaClient } from '@prisma/client';
import { CreateUserProps, User } from '../../core/entities';

export class UserBuilder {
  private user: CreateUserProps;
  private constructor() {
    this.user = {
      name: 'any name',
      email: 'user@mail.com',
      password: 'any password',
    };
  }

  static init(): UserBuilder {
    return new UserBuilder();
  }

  withEmail(email: string): UserBuilder {
    this.user.email = email;
    return this;
  }

  withPassword(password: string): UserBuilder {
    this.user.password = password;
    return this;
  }

  withName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  build(): User {
    return User.createNew(this.user);
  }

  async buildAndSave(service: PrismaClient): Promise<User> {
    const user = this.build();
    await service.user.create({
      data: {
        ...user.toJSON(),
        password: user.getPassword(),
      },
    });
    return user;
  }
}
