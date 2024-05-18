import { randomUUID } from 'crypto';
import { DomainException } from '@core/common/exceptions/domain.exception';
import { BaseEntity, BaseEntityProps } from './base.entity';

type TransactionStatus =
  | 'pending'
  | 'completed'
  | 'canceled'
  | 'future'
  | 'overdue';

export const transactionStatus: Record<
  Uppercase<TransactionStatus>,
  TransactionStatus
> = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELED: 'canceled',
  FUTURE: 'future',
  OVERDUE: 'overdue',
} as const;

interface TransactionEntityProps {
  bankAccountId: string;
  categoryId: string;
  status: TransactionStatus;
  value: number;
  deadline: Date;
  description: string;
}

export interface CreateTransactionProps
  extends TransactionEntityProps,
    BaseEntityProps {}

export class Transaction extends BaseEntity {
  private bankAccountId: TransactionEntityProps['bankAccountId'];
  private categoryId: TransactionEntityProps['categoryId'];
  private value: TransactionEntityProps['value'];
  private status: TransactionEntityProps['status'];
  private deadline: TransactionEntityProps['deadline'];
  private description: TransactionEntityProps['description'];

  private constructor(data: CreateTransactionProps) {
    super(data);
    this.validate();
    this.updateStatus();
  }

  static createNew(
    data: Omit<
      CreateTransactionProps,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'excluded'
      | 'blocked'
      | 'excludedAt'
      | 'disabled'
    >
  ): Transaction {
    const id = randomUUID();

    return new Transaction({
      ...data,
      id,
      disabled: false,
      excluded: false,
      blocked: false,
      excludedAt: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static createFrom(data: CreateTransactionProps): Transaction {
    return new Transaction(data);
  }

  update(data: Partial<TransactionEntityProps>): void {
    this.throwIfExcluded();
    this.throwIfDisabled();
    Object.assign(this, data);
    this.validate();
    this.updateStatus(data.status);
    this.updatedAt = new Date();
  }

  getBankAccountId(): TransactionEntityProps['bankAccountId'] {
    return this.bankAccountId;
  }

  getCategoryId(): TransactionEntityProps['categoryId'] {
    return this.categoryId;
  }

  getValue(): TransactionEntityProps['value'] {
    return this.value;
  }

  getDescription(): TransactionEntityProps['description'] {
    return this.description;
  }

  serialize() {
    return {
      id: this.id,
      bankAccountId: this.bankAccountId,
      categoryId: this.categoryId,
      status: this.status,
      value: this.value,
      deadline: this.deadline,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      disabled: this.disabled,
      blocked: this.blocked,
    };
  }

  private validate() {
    if (this.value <= 0) {
      throw new DomainException('Value must be greater than 0');
    }

    if (!this.bankAccountId || this.bankAccountId.trim() === '') {
      throw new DomainException('Bank account id is required');
    }

    if (!this.categoryId || this.categoryId.trim() === '') {
      throw new DomainException('Category id is required');
    }
  }

  updateStatus(newStatus?: TransactionStatus): void {
    const SECONDS = 1000;
    const MINUTES = 60;
    const HOURS = 60;
    const DAYS = 24;
    if (newStatus) {
      this.status = newStatus;
      return;
    }

    if (this.deadline < new Date()) {
      this.status = transactionStatus.OVERDUE;
      return;
    }

    // if deadline is more 7 days from now
    if (
      this.deadline.getTime() - new Date().getTime() >
      7 * DAYS * HOURS * MINUTES * SECONDS
    ) {
      this.status = transactionStatus.FUTURE;
      return;
    }

    this.status = transactionStatus.PENDING;
  }
}
