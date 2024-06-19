import { DomainException } from '@common/exception/domain.exception';
import { Category } from './category.entity';

describe('Entity - Category', () => {
  let category: Category;

  beforeEach(() => {
    category = Category.createNew({
      name: 'Despesas Operacionais',
      description: 'Despesas operacionais da empresa',
      type: 'expense',
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
        expect(category).toBeDefined();
        category.assignCode(1);
        const serialized = category.toJSON();
        expect(serialized).toStrictEqual({
          id: expect.any(String),
          name: 'Despesas Operacionais',
          description: 'Despesas operacionais da empresa',
          code: 1,
          type: 'expense',
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
        const category = Category.createFrom({
          id: '123',
          name: 'Despesas Operacionais',
          description: 'Despesas operacionais da empresa',
          type: 'expense',
          createdAt: new Date(),
          updatedAt: new Date(),
          blocked: false,
          excluded: false,
          disabled: false,
          code: 1,
        });

        expect(category).toBeDefined();
        expect(category.getId()).toBe('123');
        expect(category.getName()).toBe('Despesas Operacionais');
        expect(category.getDescription()).toBe(
          'Despesas operacionais da empresa',
        );
        expect(category.getType()).toBe('expense');
        expect(category.getCode()).toBe(1);
      });
    });
  });

  describe('Update', () => {
    describe('Properties', () => {
      it('Should update all properties', () => {
        category.update({
          name: 'Despesas Fixas',
          description: 'Despesas fixas da empresa',
          type: 'expense',
        });

        expect(category.getName()).toBe('Despesas Fixas');
        expect(category.getDescription()).toBe('Despesas fixas da empresa');
      });

      it('Should update only property type', () => {
        category.update({
          type: 'income',
        });

        expect(category.getType()).toBe('income');
        expect(category.getName()).toBe('Despesas Operacionais');
        expect(category.getDescription()).toBe(
          'Despesas operacionais da empresa',
        );
      });

      it('Should update only property name', () => {
        category.update({
          name: 'Despesas Fixas',
        });

        expect(category.getName()).toBe('Despesas Fixas');
        expect(category.getDescription()).toBe(
          'Despesas operacionais da empresa',
        );
        expect(category.getType()).toBe('expense');
      });

      it('Should update only property description', () => {
        category.update({
          description: 'Despesas fixas da empresa',
        });

        expect(category.getName()).toBe('Despesas Operacionais');
        expect(category.getDescription()).toBe('Despesas fixas da empresa');
        expect(category.getType()).toBe('expense');
      });

      it('Should return erro when try update any property when category disabled', () => {
        category.disable();

        expect(() =>
          category.update({
            name: 'Despesas Fixas',
          }),
        ).toThrowError(new DomainException('Categoria está desabilitada'));
      });

      it('Should return erro when try update any property when category excluded', () => {
        category.exclude();

        expect(() =>
          category.update({
            name: 'Despesas Fixas',
          }),
        ).toThrowError(new DomainException('Categoria está excluída'));
      });
    });

    describe('Status', () => {
      it('Should disable category', () => {
        category.disable();

        expect(category.isDisabled()).toBeTruthy();
      });

      it('Should enable category', () => {
        category.disable();
        category.enable();

        expect(category.isDisabled()).toBeFalsy();
      });

      it('Should exclude category', () => {
        category.exclude();

        expect(category.isExcluded()).toBeTruthy();
      });

      it('Should return erro when try disable category when category excluded', () => {
        category.exclude();

        expect(() => category.disable()).toThrowError(
          new DomainException('Categoria está excluída'),
        );
      });

      it('Should return erro when try enable category when category excluded', () => {
        category.disable();
        category.exclude();

        expect(() => category.enable()).toThrowError(
          new DomainException('Categoria está excluída'),
        );
      });
    });
  });

  describe('Serialize', () => {
    it('Should return all properties serialized', () => {
      const category = Category.createNew({
        name: 'Despesas Operacionais',
        description: 'Despesas operacionais da empresa',
        type: 'expense',
      });

      const serialized = category.toJSON();

      expect(serialized).toEqual({
        id: expect.any(String),
        name: 'Despesas Operacionais',
        description: 'Despesas operacionais da empresa',
        type: 'expense',
        disabled: false,
        blocked: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });
});
