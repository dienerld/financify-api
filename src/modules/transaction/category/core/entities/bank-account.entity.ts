import { ulid } from 'ulid';

import { BaseEntity, BaseEntityProps } from '@/common/base/base.entity';

interface BankAccountEntityProps {
  name: string;
  number: string;
  balance: number;
}

export interface CreateBankAccountProps
  extends BankAccountEntityProps,
    BaseEntityProps {}

export class BankAccount extends BaseEntity {
  private name: BankAccountEntityProps['name'];
  private number: BankAccountEntityProps['number'];
  private balance: BankAccountEntityProps['balance'];

  private constructor(data: CreateBankAccountProps) {
    super(data, 'Conta Bancária', '1');
    Object.assign(this, data);
  }

  static createNew(
    data: Omit<CreateBankAccountProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): BankAccount {
    const id = ulid();
    return new BankAccount({
      ...data,
      id,
      disabled: false,
      excluded: false,
      blocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static createFrom(data: CreateBankAccountProps): BankAccount {
    return new BankAccount(data);
  }

  update(data: Partial<BankAccountEntityProps>): void {
    Object.assign(this, data);
  }

  getName(): BankAccountEntityProps['name'] {
    return this.name;
  }

  getNumber(): BankAccountEntityProps['number'] {
    return this.number;
  }

  getBalance(): BankAccountEntityProps['balance'] {
    return this.balance;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      number: this.number,
      balance: this.balance,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      excluded: this.excluded,
      disabled: this.disabled,
      blocked: this.blocked,
    };
  }
}
