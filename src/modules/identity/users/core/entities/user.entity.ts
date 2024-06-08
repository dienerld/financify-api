import { ulid } from 'ulid';

import { BaseEntity, BaseEntityProps } from '@/common/base/base.entity';

export interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

interface UserEntityProps extends CreateUserProps, BaseEntityProps {}

export class User extends BaseEntity {
  private name: CreateUserProps['name'];
  private email: CreateUserProps['email'];
  private password: CreateUserProps['password'];

  private constructor(data: UserEntityProps) {
    super(data);
    Object.assign(this, data);
  }

  static createNew(data: CreateUserProps): User {
    const id = ulid();

    return new User({
      ...data,
      id,
      disabled: false,
      excluded: false,
      blocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static createFrom(data: UserEntityProps): User {
    return new User(data);
  }

  update(data: Partial<UserEntityProps>): void {
    Object.assign(this, data);
  }

  getName(): UserEntityProps['name'] {
    return this.name;
  }

  getEmail(): UserEntityProps['email'] {
    return this.email;
  }

  getPassword(): UserEntityProps['password'] {
    return this.password;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      disabled: this.disabled,
      excluded: this.excluded,
      blocked: this.blocked,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
