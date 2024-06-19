import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { validateOrReject } from 'class-validator';

import { ApiResponseUnauthorized } from '@/common/docs/unauthorized.decorator';
import { ApiResponseServerError } from '@/common/docs/internal-error.decorator';
import { ApiResponseBadRequest } from '@/common/docs/bad-request.decorator';
import { tags } from '@/config/docs/tags';
import { Public } from '@/modules/identity/auth/decorators/public.decorator';

import { UserService } from '../core/services';
import { CreateUserDto, ParamFindOneUserDto } from './dto/input.dto';
import {
  SchemaUserResponse,
  SchemaUserResponseList,
  UserDto,
} from './dto/output.dto';

@Controller('user')
@ApiTags(tags.user)
export class UserController {
  constructor(
    @Inject(UserService.name)
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Create',
    description: 'Create a new user',
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Returns a user created',
    type: SchemaUserResponse,
  })
  @ApiResponseUnauthorized()
  @ApiResponseServerError()
  @ApiResponseBadRequest()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.save(createUserDto);
    const userDto = new UserDto(user);

    await validateOrReject(userDto);

    return userDto;
  }

  @ApiOperation({
    summary: 'List',
    description: 'List all users',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Returns a list of users',
    type: SchemaUserResponseList,
  })
  @ApiResponseUnauthorized()
  @ApiResponseServerError()
  @ApiResponseBadRequest()
  @Get()
  async list() {
    const users = await this.userService.list();
    const usersDto = users.map((user) => new UserDto(user));

    await validateOrReject(usersDto);

    return usersDto;
  }

  @ApiOperation({
    summary: 'Busca de usuário por id',
    description: 'Retorna um usuário encontrado com todas suas informações',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Retorna o usuário encontrado',
    type: SchemaUserResponse,
  })
  @ApiResponseUnauthorized()
  @ApiResponseServerError()
  @ApiResponseBadRequest()
  @Get(':id')
  async findOne(@Param() { id }: ParamFindOneUserDto) {
    const user = await this.userService.findOne(id);
    const userDto = new UserDto(user);

    await validateOrReject(userDto);

    return userDto;
  }
}
