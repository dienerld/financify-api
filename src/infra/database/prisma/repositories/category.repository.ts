import {
  Category,
  CategoryType,
} from '@/core/modules/transaction/entities/category.entity';
import { CategoryRepository } from '@/core/modules/transaction/persistence/repository';
import Prisma, { PrismaClient } from '@prisma/client';
import { PersistenceNotFoundException } from '../../exception/client.exception';

const categoryType: Record<Prisma.CategoryType, CategoryType> = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const;

export class PrismaCategoryRepository implements CategoryRepository {
  private readonly repository: PrismaClient['category'];
  constructor(client: PrismaClient) {
    this.repository = client.category;
  }

  async save(category: Category): Promise<void> {
    const serialized = category.toJSON();
    const { code } = await this.repository.create({
      data: {
        ...serialized,
        type: serialized.type.toUpperCase() as Prisma.CategoryType,
      },
      select: { code: true },
    });

    category.assignCode(code);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.findMany();
    return categories.map(this.mapToEntity);
  }

  async findOne(value: string | number): Promise<Category> {
    const where: Prisma.Prisma.CategoryWhereUniqueInput = {
      id: undefined,
      code: undefined,
    };
    if (typeof value === 'string') {
      where.id = value;
    } else {
      where.code = value;
    }

    const category = await this.repository.findUnique({
      where,
    });

    if (!category) {
      throw new PersistenceNotFoundException('Category not found');
    }

    return this.mapToEntity(category);
  }

  private mapToEntity(
    category: Prisma.Prisma.CategoryGetPayload<{}>,
  ): Category {
    return Category.createFrom({
      id: category.id,
      name: category.name,
      description: category.description,
      type: categoryType[category.type],
      code: category.code,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      blocked: category.blocked,
      disabled: category.disabled,
      excluded: category.excluded,
      excludedAt: category.excludedAt || undefined,
    });
  }
}
