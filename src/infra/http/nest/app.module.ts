import { Module } from '@nestjs/common';
import { TransactionModule } from './modules/transaction/transaction.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CatchAllException } from './common/exception/catch-all.exception';
import { CustomResponseInterceptor } from './common/interceptor/response.interceptor';
import { ClassValidatorPipe } from './common/pipes/validation.pipe';

@Module({
  imports: [TransactionModule],
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
  ],
})
export class AppModule {}
