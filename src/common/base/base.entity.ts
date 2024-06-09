import { DomainException } from '@common/exception/domain.exception';

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
  private readonly displayName: string;
  private readonly genre: '0' | '1';

  /**
   * @param data
   * @param displayName Display name of the entity
   * @param genre '0' for masculine and '1' for feminine
   */
  constructor(
    data: BaseEntityProps,
    displayName: string,
    genre: '0' | '1' = '0',
  ) {
    Object.assign(this, data);
    this.displayName = displayName;
    this.genre = genre;
  }

  abstract toJSON(): Record<string, unknown>;

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
      const disabled = this.genre === '0' ? 'desabilitado' : 'desabilitada';
      throw new DomainException(
        `${this.displayName || this.constructor.name} está ${disabled}`,
      );
    }
  }

  throwIfExcluded(): void {
    if (this.isExcluded()) {
      const excluded = this.genre === '0' ? 'excluído' : 'excluída';
      throw new DomainException(
        `${this.displayName || this.constructor.name} está ${excluded}`,
      );
    }
  }
}
