import { Controller, Get, Post, Body, Inject, Param } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateCategoryDto } from './dto/input.dto';
import { CategoryDto } from './dto/output.dto';
import { tags } from '../../../../config/docs/tags';
import { CategoryService } from '../core/services';

@Controller('category')
@ApiTags(tags.Category)
export class CategoryController {
  constructor(
    @Inject(CategoryService.name)
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create',
    description: 'Create a new category',
  })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDto> {
    const category = await this.categoryService.save(createCategoryDto);
    const categoryDto = new CategoryDto(category);

    await validateOrReject(categoryDto);

    return categoryDto;
  }

  @Get()
  @ApiOperation({
    summary: 'List',
    description: 'List all categories',
  })
  findAll() {
    return this.categoryService.list();
  }

  @Get(':value')
  @ApiOperation({
    summary: 'Find',
    description: 'Find a category by id or code',
  })
  findOne(@Param('value') value: string | number) {
    return this.categoryService.findOne(value);
  }
}
