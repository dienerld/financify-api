import { randomUUID } from 'crypto';
import { DomainException } from '@core/common/exceptions/domain.exception';
import { Transaction, transactionStatus } from './transaction.entity';

describe('Transaction', () => {
  let transaction: Transaction;

  beforeEach(() => {
    transaction = Transaction.createNew({
      bankAccountId: randomUUID(),
      categoryId: randomUUID(),
      value: 100,
      description: 'Compra de produtos',
      deadline: new Date(),
      status: 'pending',
    });
  });

  describe('Create', () => {
    describe('New', () => {
      it('Should return entity created', () => {
        expect(transaction).toBeDefined();
        const serialized = transaction.serialize();
        expect(serialized).toStrictEqual({
          id: expect.any(String),
          bankAccountId: expect.any(String),
          categoryId: expect.any(String),
          status: 'pending',
          deadline: expect.any(Date),
          value: 100,
          description: 'Compra de produtos',
          disabled: false,
          blocked: false,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      });

      it('Should throw if negative value', () => {
        expect(() =>
          Transaction.createNew({
            bankAccountId: randomUUID(),
            categoryId: randomUUID(),
            value: -100,
            description: 'Compra de produtos',
            deadline: new Date(),
            status: 'pending',
          })
        ).toThrowError(new DomainException('Value must be greater than 0'));
      });

      it('Should throw if value is zero', () => {
        expect(() =>
          Transaction.createNew({
            bankAccountId: randomUUID(),
            categoryId: randomUUID(),
            value: 0,
            description: 'Compra de produtos',
            deadline: new Date(),
            status: 'pending',
          })
        ).toThrowError(new DomainException('Value must be greater than 0'));
      });

      it('Should throw if bank account id is empty', () => {
        expect(() =>
          Transaction.createNew({
            ...transaction.serialize(),
            bankAccountId: '',
          })
        ).toThrowError(new DomainException('Bank account id is required'));
      });

      it('Should throw if category id is empty', () => {
        expect(() =>
          Transaction.createNew({
            ...transaction.serialize(),
            categoryId: '',
          })
        ).toThrowError(new DomainException('Category id is required'));
      });
    });

    describe('From', () => {
      it('Should return entity created', () => {
        const newTransaction = Transaction.createFrom({
          ...transaction.serialize(),
          status: transactionStatus.OVERDUE,
          excluded: false,
        });
        expect(newTransaction).toBeDefined();
        const serialized = newTransaction.serialize();
        expect(serialized).toStrictEqual({
          id: expect.any(String),
          bankAccountId: expect.any(String),
          categoryId: expect.any(String),
          value: 100,
          status: transactionStatus.OVERDUE,
          deadline: expect.any(Date),
          description: 'Compra de produtos',
          disabled: false,
          blocked: false,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      });
    });
  });

  describe('Update', () => {
    it('Should update transaction', () => {
      const newValue = 200;
      const expected = {
        ...transaction.serialize(),
        value: newValue,
      };

      transaction.update({ value: newValue });

      const serialized = transaction.serialize();
      expect(serialized).toStrictEqual({
        ...expected,
        updatedAt: expect.any(Date),
      });
    });

    it('Should throw error when negative value', () => {
      expect(() => transaction.update({ value: -100 })).toThrowError(
        new DomainException('Value must be greater than 0')
      );
    });

    it('Should throw error when value is zero', () => {
      expect(() => transaction.update({ value: 0 })).toThrowError(
        new DomainException('Value must be greater than 0')
      );
    });

    it('Should throw error if bank account id is empty', () => {
      expect(() => transaction.update({ bankAccountId: '' })).toThrowError(
        new DomainException('Bank account id is required')
      );
    });

    it('Should throw error if category id is empty', () => {
      expect(() => transaction.update({ categoryId: '' })).toThrowError(
        new DomainException('Category id is required')
      );
    });

    it('Should throw error if transaction is disabled', () => {
      transaction.disable();

      expect(() => transaction.update({ value: 200 })).toThrowError(
        new DomainException('Transaction is disabled')
      );
    });

    it('Should throw error if transaction is excluded', () => {
      transaction.exclude();

      expect(() => transaction.update({ value: 200 })).toThrowError(
        new DomainException('Transaction is excluded')
      );
    });
  });
});
