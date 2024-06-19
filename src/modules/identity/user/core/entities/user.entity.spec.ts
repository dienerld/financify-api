import { DomainException } from '@common/exception/domain.exception';
import { User } from './user.entity';

describe('Entity - User', () => {
  let user: User;

  beforeEach(() => {
    user = User.createNew({
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'secret_pass',
    });
  });

  describe('Create', () => {
    describe('New', () => {
      /**
   *  * Teste de Criação Básica:
    Descrição: Verifica se é possível criar uma nova categoria com dados válidos.
    Entrada: Nome da categoria, Tipo (Receita ou Despesa).
    Saída Esperada: A categoria é criada com sucesso no sistema.
   */
      it('Basic Creation', () => {
        expect(user).toBeDefined();
        const serialized = user.toJSON();
        expect(serialized).toStrictEqual({
          id: expect.any(String),
          name: 'John Doe',
          email: 'john@mail.com',
          disabled: false,
          blocked: false,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      });
    });

    describe('From', () => {
      /**
       * Teste de Criação a partir de Dados:
       * Descrição: Verifica se é possível criar uma nova categoria a partir de dados existentes.
       * Entrada: Dados de uma categoria válida.
       * Saída Esperada: A categoria é criada com sucesso no sistema.
       */
      it('Create From Data', () => {
        const user = User.createFrom({
          id: '123',
          name: 'John Doe',
          email: 'john@mail.com',
          password: 'password',
          createdAt: new Date(),
          updatedAt: new Date(),
          blocked: false,
          excluded: false,
          disabled: false,
        });

        expect(user).toBeDefined();
        expect(user.getId()).toBe('123');
        expect(user.getName()).toBe('John Doe');
      });
    });
  });

  describe('Update', () => {
    describe('Properties', () => {
      it('Should update all properties', () => {
        user.update({
          name: 'Jane Doe',
          email: 'jane@mail.com',
        });

        expect(user.getName()).toBe('Jane Doe');
        expect(user.getEmail()).toBe('jane@mail.com');
      });

      it('Should update only property name', () => {
        user.update({
          name: 'Jane Doe',
        });

        expect(user.getName()).toBe('Jane Doe');
      });

      it('Should change password', () => {
        user.changePassword('new_password');

        expect(user.getPassword()).toBe('new_password');
      });

      it('Should return erro when try update any property when user disabled', () => {
        user.disable();

        expect(() =>
          user.update({
            name: 'new name',
          }),
        ).toThrowError(new DomainException('Usuário está desabilitado'));
      });

      it('Should return erro when try update any property when user excluded', () => {
        user.exclude();

        expect(() =>
          user.update({
            name: 'new name',
          }),
        ).toThrowError(new DomainException('Usuário está excluído'));
      });
    });

    describe('Status', () => {
      it('Should disable user', () => {
        user.disable();

        expect(user.isDisabled()).toBeTruthy();
      });

      it('Should enable user', () => {
        user.disable();
        user.enable();

        expect(user.isDisabled()).toBeFalsy();
      });

      it('Should exclude user', () => {
        user.exclude();

        expect(user.isExcluded()).toBeTruthy();
      });

      it('Should return erro when try disable user when user excluded', () => {
        user.exclude();

        expect(() => user.disable()).toThrowError(
          new DomainException('Usuário está excluído'),
        );
      });

      it('Should return erro when try enable user when user excluded', () => {
        user.disable();
        user.exclude();

        expect(() => user.enable()).toThrowError(
          new DomainException('Usuário está excluído'),
        );
      });
    });
  });

  describe('Serialize', () => {
    it('Should return all properties serialized', () => {
      const user = User.createNew({
        name: 'John Doe',
        email: 'john@mail.com',
        password: 'secret_pass',
      });

      const serialized = user.toJSON();

      expect(serialized).toEqual({
        id: expect.any(String),
        name: 'John Doe',
        email: 'john@mail.com',
        disabled: false,
        blocked: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });
});
