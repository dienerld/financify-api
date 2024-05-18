import { DomainException } from '../exceptions/domain.exception';

export type BaseEntityProps = {
  id: string;
  disabled: boolean;
  excluded: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  excludedAt?: Date;
};

export abstract class BaseEntity {
  protected readonly id: BaseEntityProps['id'];
  protected disabled: BaseEntityProps['disabled'];
  protected excluded: BaseEntityProps['excluded'];
  protected blocked: BaseEntityProps['blocked'];
  protected createdAt: BaseEntityProps['createdAt'];
  protected updatedAt: BaseEntityProps['updatedAt'];
  protected excludedAt?: BaseEntityProps['excludedAt'];

  constructor(data: BaseEntityProps) {
    Object.assign(this, data);
  }

  abstract serialize(): Record<string, unknown>;

  getId(): string {
    return this.id;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  isBlocked(): boolean {
    return this.blocked;
  }

  isDisabled(): boolean {
    return this.disabled;
  }

  isExcluded(): boolean {
    return this.excluded;
  }

  disable(): void {
    this.throwIfExcluded();
    this.disabled = true;
  }

  enable(): void {
    this.throwIfExcluded();
    this.disabled = false;
  }

  exclude(): void {
    this.excluded = true;
    this.excludedAt = new Date();
  }

  throwIfDisabled(): void {
    if (this.isDisabled()) {
      throw new DomainException(`${this.constructor.name} is disabled`);
    }
  }

  throwIfExcluded(): void {
    if (this.isExcluded()) {
      throw new DomainException(`${this.constructor.name} is excluded`);
    }
  }
}
