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
}
