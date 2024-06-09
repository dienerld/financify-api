import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './core/auth.guard';
import { AuthProviders } from './auth.provider';
import { AuthController } from './rest/auth.controller';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: 'const',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...AuthProviders,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
