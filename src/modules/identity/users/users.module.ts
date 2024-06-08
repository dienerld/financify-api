import { Module } from '@nestjs/common';
import { UserController } from './rest/user.controller';

@Module({
  controllers: [UserController],
})
export class UsersModule {}
