import { Module } from '@nestjs/common';
import { CategoryController } from './rest/category.controller';
import { categoryProviders } from './category.provider';

@Module({
  controllers: [CategoryController],
  providers: categoryProviders,
})
export class CategoryModule {}
