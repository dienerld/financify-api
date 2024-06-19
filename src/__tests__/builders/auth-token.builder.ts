import { redisConst } from '@/database/redis/constants';
import { RedisService } from '@/database/redis/redis.service';
import { User } from '@/modules/identity/user/core/entities';
import { JwtService } from '@nestjs/jwt';

export class SessionBuilder {
  private jwtService = new JwtService({
    secret: process.env.JWT_SECRET,
  });

  private user = User.createNew({
    name: 'any name',
    email: 'any@mail.com',
    password: 'any password',
  });

  private constructor(private readonly redisService: RedisService) {}

  static init(redisService: RedisService): SessionBuilder {
    return new SessionBuilder(redisService);
  }

  withUser(user: User): SessionBuilder {
    this.user = user;
    return this;
  }

  async build(): Promise<{
    jwt: string;
    bearer: `Bearer ${string}`;
  }> {
    const jwt = this.jwtService.sign({
      sub: this.user.getId(),
      email: this.user.getEmail(),
    });

    await this.redisService.set(
      `${redisConst.userSession}-${this.user.getId()}`,
      jwt,
    );

    return {
      jwt,
      bearer: `Bearer ${jwt}`,
    };
  }
}
