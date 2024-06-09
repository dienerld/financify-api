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
    super(data, 'Usuário');
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

  update(data: Omit<Partial<CreateUserProps>, 'password'>): void {
    this.throwIfExcluded();
    this.throwIfDisabled();
    Object.assign(this, data);
  }

  changePassword(password: string): void {
    this.password = password;
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
      disabled: this.disabled,
      blocked: this.blocked,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
