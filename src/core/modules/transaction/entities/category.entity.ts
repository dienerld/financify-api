import { randomUUID } from 'crypto';
import { BaseEntity, BaseEntityProps } from './base.entity';

export type CategoryType = 'income' | 'expense';

interface CategoryEntityProps {
  name: string;
  description: string;
  type: CategoryType;
}

export interface CreateCategoryProps
  extends CategoryEntityProps,
    BaseEntityProps {}

export class Category extends BaseEntity {
  private name: CategoryEntityProps['name'];
  private description: CategoryEntityProps['description'];
  private type: CategoryEntityProps['type'];

  private constructor(data: CreateCategoryProps) {
    super(data);
  }

  static createNew(
    data: Omit<
      CreateCategoryProps,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'excluded'
      | 'blocked'
      | 'excludedAt'
      | 'disabled'
    >
  ): Category {
    const id = randomUUID();

    return new Category({
      ...data,
      id,
      excluded: false,
      blocked: false,
      disabled: false,
      excludedAt: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static createFrom(data: CreateCategoryProps): Category {
    return new Category(data);
  }

  update(data: Partial<CategoryEntityProps>): void {
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

  serialize() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      disabled: this.disabled,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
