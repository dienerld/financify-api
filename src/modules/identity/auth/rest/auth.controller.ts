import { Response } from 'express';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';

import { Public } from '../decorators/public.decorator';

import { tags } from '@/config/docs/tags';
import { ApiResponseBadRequest } from '@/common/docs/bad-request.decorator';
import { ApiResponseServerError } from '@/common/docs/internal-error.decorator';

import { SignInDto } from '../dto/input.dto';
import { SchemaSignInResponse, SignInResponseDto } from '../dto/output.dto';
import { AuthService } from '../core/auth.service';
import { ClearAuthCookie } from '@/common/interceptor/clear-cookies.interceptor';

@ApiTags(tags.auth)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService.name)
    private readonly authService: AuthService,
  ) {}

  @HttpCode(200)
  @Public()
  @Post('sign-in')
  @ApiOperation({
    summary: 'Sign In',
    description: 'Sign in',
  })
  @ApiCreatedResponse({
    status: 200,
    description: 'Returns a token',
    type: SchemaSignInResponse,
  })
  @ApiResponseServerError()
  @ApiResponseBadRequest()
  @UseInterceptors(ClearAuthCookie)
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() { email, password }: SignInDto,
  ): Promise<SignInResponseDto> {
    const { id: userId, token } = await this.authService.signIn(
      email,
      password,
    );
    const cookieName = `auth_${userId}`;
    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 20 * 60 * 1000),
    });
    return {
      token,
    };
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'logout',
  })
  async logout(@Query('userId') userId: string) {
    await this.authService.logout(userId);
  }
}
