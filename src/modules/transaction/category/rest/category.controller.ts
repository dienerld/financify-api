import { Controller, Get, Post, Body, Inject, Param } from '@nestjs/common';
import { isNumberString, validateOrReject } from 'class-validator';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ApiResponseUnauthorized } from '@/common/docs/unauthorized.decorator';
import { ApiResponseServerError } from '@/common/docs/internal-error.decorator';
import { ApiResponseBadRequest } from '@/common/docs/bad-request.decorator';
import { tags } from '@config/docs/tags';

import { CategoryService } from '../core/services';
import { CreateCategoryDto } from './dto/input.dto';
import {
  CategoryDto,
  SchemaCategoryResponse,
  SchemaCategoryResponseList,
} from './dto/output.dto';

@Controller('category')
@ApiTags(tags.category)
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
  @ApiCreatedResponse({
    status: 201,
    description: 'Returns a category created',
    type: SchemaCategoryResponse,
  })
  @ApiResponseUnauthorized()
  @ApiResponseServerError()
  @ApiResponseBadRequest()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
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
  @ApiOkResponse({
    status: 200,
    description: 'Returns a list of categories',
    type: SchemaCategoryResponseList,
  })
  @ApiResponseUnauthorized()
  @ApiResponseServerError()
  async findAll() {
    return this.categoryService.list();
  }

  @Get(':value')
  @ApiOperation({
    summary: 'Find',
    description: 'Find a category by id or code',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Returns a category by ID or number',
    type: SchemaCategoryResponse,
  })
  @ApiResponseUnauthorized()
  @ApiResponseServerError()
  @ApiParam({
    name: 'value',
    type: String,
    description: 'Value can be the id or the code ',
  })
  findOne(@Param('value') value: string | number) {
    if (isNumberString(value)) {
      // Caso o valor seja um numero que veio como string converta para número
      value = +value;
    }
    return this.categoryService.findOne(value);
  }
}
