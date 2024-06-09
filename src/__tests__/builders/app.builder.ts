import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule } from '@nestjs/config';
import { INestApplication, Provider } from '@nestjs/common';
import { CatchAllException } from '@/common/exception/catch-all.exception';
import { CustomResponseInterceptor } from '@/common/interceptor/response.interceptor';
import { ClassValidatorPipe } from '@/common/pipes/validation.pipe';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { Type } from '@nestjs/common/interfaces';
import { JwtModule } from '@nestjs/jwt';

/**
 * BuildAppModule
 * @description Build app module for testing
 * @returns {Promise} Promise with app
 */
export async function BuildAppModule(
  controller: Type<any>,
  providers?: Provider[],
): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      JwtModule.register({
        secret: 'any_secret',
      }),
    ],
    controllers: [controller],
    providers: [
      {
        provide: APP_FILTER,
        useClass: CatchAllException,
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: CustomResponseInterceptor,
      },
      {
        provide: APP_PIPE,
        useClass: ClassValidatorPipe,
      },
      ...(providers || []),
    ],
  }).compile();

  const nestApp = moduleFixture.createNestApplication();
  await nestApp.init();

  return nestApp;
}
