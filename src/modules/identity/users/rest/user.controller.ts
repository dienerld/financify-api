import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiResponseUnauthorized } from '@/common/docs/unauthorized.decorator';
import { ApiResponseServerError } from '@/common/docs/internal-error.decorator';
import { ApiResponseBadRequest } from '@/common/docs/bad-request.decorator';
import { tags } from '@/config/docs/tags';
import { UserService } from '../core/services';
import { validateOrReject } from 'class-validator';
import { CreateUserDto } from './dto/input.dto';
import { UserDto } from './dto/output.dto';

@Controller('user')
@ApiTags(tags.User)
export class UserController {
  constructor(
    @Inject(UserService.name)
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create',
    description: 'Create a new user',
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Returns a user created',
    type: UserDto,
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
}
