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

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const token = this.extractJWTFromCookie(request);
    if (!token) {
      throw new UnauthorizedException('Token inválido ou inexistente');
    }

    const data = await this.jwtService.verifyAsync(token);
    console.log(data);
    return data;
  }

  private extractJWTFromCookie(req: Request): string | null {
    if (req.cookies) {
      const [cookie] = Object.entries(req.cookies)
        .filter(([name, _]) => name.startsWith('auth_'))
        .map(([name, value]) => ({ name, value })); // response only name

      if (cookie.name && cookie.value) {
        return cookie.value;
      }
    }
    return null;
  }
}
