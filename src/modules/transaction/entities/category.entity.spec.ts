import { Category, CategoryType } from './category.entity';

describe('Entity - Category', () => {
  describe('Create', () => {
    describe('New', () => {
      /**
   *  * Teste de Criação Básica:
    Descrição: Verifica se é possível criar uma nova categoria com dados válidos.
    Entrada: Nome da categoria, Tipo (Receita ou Despesa).
    Saída Esperada: A categoria é criada com sucesso no sistema.
   */
      it('Basic Creation', () => {
        const category = Category.createNew({
          name: 'Despesas Operacionais',
          description: 'Despesas operacionais da empresa',
          type: 'expense',
        });

        expect(category).toBeDefined();
        const serialized = category.serialize();
        expect(serialized).toStrictEqual({
          id: expect.any(String),
          name: 'Despesas Operacionais',
          description: 'Despesas operacionais da empresa',
          type: 'expense',
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
        });

        expect(category).toBeDefined();
        expect(category.getId()).toBe('123');
        expect(category.getName()).toBe('Despesas Operacionais');
        expect(category.getDescription()).toBe(
          'Despesas operacionais da empresa'
        );
        expect(category.getType()).toBe('expense');
      });
    });
  });

  describe('Update', () => {
    /**
     * Teste de Atualização:
     * Descrição: Verifica se é possível atualizar os dados de uma categoria.
     * Entrada: Categoria válida, Novos dados da categoria.
     * Saída Esperada: Os dados da categoria são atualizados corretamente.
     */
    it('All properties', () => {
      const category = Category.createNew({
        name: 'Despesas Operacionais',
        description: 'Despesas operacionais da empresa',
        type: 'expense',
      });

      category.update({
        name: 'Despesas Fixas',
        description: 'Despesas fixas da empresa',
        type: 'expense',
      });

      expect(category.getName()).toBe('Despesas Fixas');
      expect(category.getDescription()).toBe('Despesas fixas da empresa');
    });

    /**
     * Teste de Atualização - Tipo:
     * Descrição: Verifica se é possível atualizar o tipo de uma categoria.
     * Entrada: Categoria válida, Novo tipo da categoria.
     * Saída Esperada: O tipo da categoria é atualizado corretamente.
     */
    it('Type', () => {
      const category = Category.createNew({
        name: 'Despesas Operacionais',
        description: 'Despesas operacionais da empresa',
        type: 'expense',
      });

      category.update({
        type: 'income',
      });

      expect(category.getType()).toBe('income');
      expect(category.getName()).toBe('Despesas Operacionais');
      expect(category.getDescription()).toBe(
        'Despesas operacionais da empresa'
      );
    });

    /**
     * Teste de Atualização - Nome:
     * Descrição: Verifica se é possível atualizar o nome de uma categoria.
     * Entrada: Categoria válida, Novo nome da categoria.
     * Saída Esperada: O nome da categoria é atualizado corretamente.
     */
    it('Name', () => {
      const category = Category.createNew({
        name: 'Despesas Operacionais',
        description: 'Despesas operacionais da empresa',
        type: 'expense',
      });

      category.update({
        name: 'Despesas Fixas',
      });

      expect(category.getName()).toBe('Despesas Fixas');
      expect(category.getDescription()).toBe(
        'Despesas operacionais da empresa'
      );
      expect(category.getType()).toBe('expense');
    });

    /**
     * Teste de Atualização - Descrição:
     * Descrição: Verifica se é possível atualizar a descrição de uma categoria.
     * Entrada: Categoria válida, Nova descrição da categoria.
     * Saída Esperada: A descrição da categoria é atualizada corretamente.
     */
    it('Description', () => {
      const category = Category.createNew({
        name: 'Despesas Operacionais',
        description: 'Despesas operacionais da empresa',
        type: 'expense',
      });

      category.update({
        description: 'Despesas fixas da empresa',
      });

      expect(category.getName()).toBe('Despesas Operacionais');
      expect(category.getDescription()).toBe('Despesas fixas da empresa');
      expect(category.getType()).toBe('expense');
    });
  });

  describe('Serialize', () => {
    /**
     * Teste de Serialização:
     * Descrição: Verifica se é possível serializar os dados de uma categoria.
     * Entrada: Categoria válida.
     * Saída Esperada: Os dados da categoria são serializados corretamente.
     */
    it('Serialize', () => {
      const category = Category.createNew({
        name: 'Despesas Operacionais',
        description: 'Despesas operacionais da empresa',
        type: 'expense',
      });

      const serialized = category.serialize();

      expect(serialized).toEqual({
        id: expect.any(String),
        name: 'Despesas Operacionais',
        description: 'Despesas operacionais da empresa',
        type: 'expense',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });
});
