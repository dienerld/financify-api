import { randomUUID } from 'crypto';
import { BaseEntity, BaseEntityProps } from './base.entity';

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
    const id = randomUUID();

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

  static createFrom(
    data: Omit<Required<CategoryEntityProps>, 'excludedAt'>
  ): Category {
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
      name: this.name,
      description: this.description,
      code: this.code,
      type: this.type,
      blocked: this.blocked,
      disabled: this.disabled,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
