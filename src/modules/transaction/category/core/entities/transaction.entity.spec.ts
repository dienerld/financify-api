import { randomUUID } from 'crypto';
import { DomainException } from '@common/exception/domain.exception';
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
        const serialized = transaction.toJSON();
        expect(serialized).toStrictEqual({
          id: expect.any(String),
          bankAccountId: expect.any(String),
          categoryId: expect.any(String),
          status: expect.any(String),
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
          }),
        ).toThrowError(
          new DomainException('Valor da transação deve ser maior que 0'),
        );
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
          }),
        ).toThrowError(
          new DomainException('Valor da transação deve ser maior que 0'),
        );
      });

      it('Should throw if bank account id is empty', () => {
        expect(() =>
          Transaction.createNew({
            ...transaction.toJSON(),
            bankAccountId: '',
          }),
        ).toThrowError(new DomainException('Conta bancária é obrigatória'));
      });

      it('Should throw if category id is empty', () => {
        expect(() =>
          Transaction.createNew({
            ...transaction.toJSON(),
            categoryId: '',
          }),
        ).toThrowError(new DomainException('Id da categoria é obrigatório'));
      });
    });

    describe('From', () => {
      it('Should return entity created', () => {
        const newTransaction = Transaction.createFrom({
          ...transaction.toJSON(),
          status: transactionStatus.OVERDUE,
          excluded: false,
        });
        expect(newTransaction).toBeDefined();
        const serialized = newTransaction.toJSON();
        expect(serialized).toStrictEqual({
          id: expect.any(String),
          bankAccountId: expect.any(String),
          categoryId: expect.any(String),
          value: 100,
          status: expect.any(String),
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
        ...transaction.toJSON(),
        value: newValue,
      };

      transaction.update({ value: newValue });

      const serialized = transaction.toJSON();
      expect(serialized).toStrictEqual({
        ...expected,
        status: expect.any(String),
        updatedAt: expect.any(Date),
      });
    });

    it('Should throw error when negative value', () => {
      expect(() => transaction.update({ value: -100 })).toThrowError(
        new DomainException('Valor da transação deve ser maior que 0'),
      );
    });

    it('Should throw error when value is zero', () => {
      expect(() => transaction.update({ value: 0 })).toThrowError(
        new DomainException('Valor da transação deve ser maior que 0'),
      );
    });

    it('Should throw error if bank account id is empty', () => {
      expect(() => transaction.update({ bankAccountId: '' })).toThrowError(
        new DomainException('Conta bancária é obrigatória'),
      );
    });

    it('Should throw error if category id is empty', () => {
      expect(() => transaction.update({ categoryId: '' })).toThrowError(
        new DomainException('Id da categoria é obrigatório'),
      );
    });

    it('Should throw error if transaction is disabled', () => {
      transaction.disable();

      expect(() => transaction.update({ value: 200 })).toThrowError(
        new DomainException('Transação está desabilitada'),
      );
    });

    it('Should throw error if transaction is excluded', () => {
      transaction.exclude();

      expect(() => transaction.update({ value: 200 })).toThrowError(
        new DomainException('Transação está excluída'),
      );
    });
  });
});
