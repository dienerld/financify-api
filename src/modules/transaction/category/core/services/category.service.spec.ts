import { CategoryService } from '../services';
import { CategoryRepository } from '../persistence/repository';
import { Category, CreateCategoryProps } from '../entities';
import { CategoryRepositoryMock } from '../../__tests__/category-repository-mock';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: CategoryRepository;

  beforeEach(() => {
    categoryRepository = new CategoryRepositoryMock();
    categoryService = new CategoryService(categoryRepository);
  });

  describe('save', () => {
    it('should save a new category', async () => {
      const categoryDto: CreateCategoryProps = {
        name: 'exampleName',
        description: 'exampleDescription',
        type: 'expense',
      };

      const savedCategory = await categoryService.save(categoryDto);

      expect(savedCategory).toBeInstanceOf(Category);
      expect(savedCategory.getName()).toBe(categoryDto.name);
    });
  });

  describe('list', () => {
    it('should return a list of categories', async () => {
      const categories = await categoryService.list();

      expect(categories).toBeInstanceOf(Array);
      expect(categories.length).toBe(0);
    });

    it('should return a list of categories with one category', async () => {
      const category = Category.createNew({
        name: 'exampleName',
        description: 'exampleDescription',
        type: 'expense',
      });

      await categoryRepository.save(category);

      const categories = await categoryService.list();

      expect(categories).toBeInstanceOf(Array);
      expect(categories.length).toBe(1);
    });

    it('should return a list of categories with two categories', async () => {
      const category1 = Category.createNew({
        name: 'exampleName1',
        description: 'exampleDescription1',
        type: 'expense',
      });

      const category2 = Category.createNew({
        name: 'exampleName2',
        description: 'exampleDescription2',
        type: 'expense',
      });

      await categoryRepository.save(category1);
      await categoryRepository.save(category2);

      const categories = await categoryService.list();

      expect(categories).toBeInstanceOf(Array);
      expect(categories.length).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should return a category by value', async () => {
      const category = Category.createNew({
        name: 'exampleName',
        description: 'exampleDescription',
        type: 'expense',
      });

      await categoryRepository.save(category);

      const categoryFind = await categoryService.findOne(category.getId());

      expect(categoryFind).toBeInstanceOf(Category);
    });

    it('should throw an error when category is not found', async () => {
      await expect(categoryService.findOne('invalidId')).rejects.toThrowError();
    });
  });
});
