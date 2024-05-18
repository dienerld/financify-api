import { Controller, Get, Post, Body, Inject, Param } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from '@/core/modules/transaction/services';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject(CategoryService.name)
    private readonly categoryService: CategoryService
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.save(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.list();
  }

  @Get(':value')
  findOne(@Param('value') value: string | number) {
    return this.categoryService.findOne(value);
  }
}
