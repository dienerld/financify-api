import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@/database/redis/redis.service';
import { redisConst } from '@/database/redis/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const token = this.extractJWTFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token inválido ou inexistente');
    }
    const data = await this.jwtService.verifyAsync(token);
    const tokenSession = await this.redisService.get<string>(
      `${redisConst.userSession}-${data.sub}`,
    );
    if (!tokenSession || tokenSession !== token) {
      throw new UnauthorizedException('Sessão inválida');
    }

    request.user = data;

    return data;
  }

  private extractJWTFromHeader(req: Request): string | null {
    const [loader, token] = req.headers.authorization?.split(' ') || [];
    if (
      loader === 'Bearer' &&
      token &&
      ['undefined', 'null'].includes(token) === false
    ) {
      return token;
    }
    return null;
  }
}
