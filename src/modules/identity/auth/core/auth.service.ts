import { UnauthorizedException } from '@nestjs/common';
import {
  Encrypter,
  UserRepository,
} from '@modules/identity/user/core/interfaces';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@/database/redis/redis.service';
import { redisConst } from '@/database/redis/constants';

export class AuthService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{
    token: string;
    id: string;
    name: string;
  }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválido');
    }
    const isPasswordMatch = await this.encrypter.compare(
      password,
      user.getPassword(),
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Email ou senha inválido');
    }

    const token = await this.jwtService.signAsync({
      sub: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
    });

    await this.redisService.set(
      `${redisConst.userSession}-${user.getId()}`,
      token,
    );

    return {
      token,
      name: user.getName(),
      id: user.getId(),
    };
  }

  async logout(userId: string): Promise<void> {
    await this.redisService.del(`${redisConst.userSession}-${userId}`);
  }
}
