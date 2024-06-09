import { ulid } from 'ulid';

import { BaseEntity, BaseEntityProps } from '@/common/base/base.entity';

export type CategoryType = 'income' | 'expense';

export interface CreateCategoryProps {
  name: string;
  description: string;
  type: CategoryType;
}

export interface CategoryEntityProps
  extends CreateCategoryProps,
    BaseEntityProps {
  code?: number;
}

export class Category extends BaseEntity {
  private name: CategoryEntityProps['name'];
  private code: CategoryEntityProps['code'];
  private description: CategoryEntityProps['description'];
  private type: CategoryEntityProps['type'];

  private constructor(data: CategoryEntityProps) {
    super(data);
    Object.assign(this, data);
  }

  static createNew(data: CreateCategoryProps): Category {
    const id = ulid();

    return new Category({
      id,
      ...data,
      excluded: false,
      blocked: false,
      disabled: false,
      excludedAt: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static createFrom(data: CategoryEntityProps & { code: number }): Category {
    return new Category(data);
  }

  update(data: Partial<CreateCategoryProps>): void {
    this.throwIfExcluded();
    this.throwIfDisabled();
    Object.assign(this, data);
    this.updatedAt = new Date();
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getType(): CategoryType {
    return this.type;
  }

  getCode(): number {
    return this.code!;
  }

  assignCode(code: number): void {
    this.code = code;
  }

  toJSON() {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      description: this.description,
      type: this.type,
      disabled: this.disabled,
      blocked: this.blocked,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
