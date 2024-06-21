import { BankAccount } from './bank-account.entity';

describe('Transaction - Bank Account - Entity', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = BankAccount.createNew({
      name: 'Conta Corrente',
      number: '1234',
      balance: 1000,
    });
  });

  describe('Create', () => {
    describe('New', () => {
      it('Basic Creation', () => {
        expect(bankAccount).toBeDefined();
        const serialized = bankAccount.toJSON();
        expect(serialized).toStrictEqual({
          id: expect.any(String),
          name: 'Conta Corrente',
          number: '1234',
          balance: 1000,
          disabled: false,
          blocked: false,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      });
    });

    describe('From', () => {
      it('Create From Data', () => {
        const bankAccount = BankAccount.createFrom({
          id: '123',
          name: 'Conta Corrente',
          number: '1234',
          balance: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
          blocked: false,
          excluded: false,
          disabled: false,
        });

        expect(bankAccount).toBeDefined();
        const serialized = bankAccount.toJSON();
        expect(serialized).toStrictEqual({
          id: '123',
          name: 'Conta Corrente',
          number: '1234',
          balance: 1000,
          disabled: false,
          blocked: false,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      });
    });
  });

  describe('Update', () => {
    it('Change name', () => {
      bankAccount.changeName('Conta Poupança');
      expect(bankAccount.getName()).toBe('Conta Poupança');
    });
    describe('Deposit', () => {
      it('Deposit valid value', () => {
        bankAccount.deposit(500);
        expect(bankAccount.getBalance()).toBe(1500);
      });

      it('Deposit invalid value', () => {
        expect(() => bankAccount.deposit(0)).toThrowError(
          'O valor do depósito deve ser maior que zero.',
        );
      });
    });

    describe('Withdraw', () => {
      it('Withdraw valid value', () => {
        bankAccount.withdraw(500);
        expect(bankAccount.getBalance()).toBe(500);
      });

      it('Withdraw invalid value', () => {
        expect(() => bankAccount.withdraw(0)).toThrowError(
          'O valor do saque deve ser maior que zero.',
        );
      });

      it('Withdraw value more balance', () => {
        expect(() => bankAccount.withdraw(1500)).toThrowError(
          'Saldo insuficiente',
        );
      });
    });
  });
});
