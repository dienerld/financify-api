import request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { INestApplication } from '@nestjs/common';

import { BuildAppModule } from '@/__tests__/builders/app.builder';
import { RedisService } from '@/database/redis/redis.service';

import { UserRepositoryMock } from '../../user/__tests__/user-repository-mock';
import { EncrypterMock } from '../../user/__tests__/encrypter-mock';

import { EncrypterKey, UserRepositoryKey } from '../../user/core/interfaces';
import { User } from '../../user/core/entities';
import { SignInDto } from '../dto/input.dto';

import { AuthService } from '../core/auth.service';
import { AuthController } from './auth.controller';

const expectValidation = (
  response: any,
  message: string,
  status: number = 400,
) => {
  expect(response.status).toBe(status);
  expect(response.body.success).toBeFalsy();
  expect(response.body.message).toBe(message);
};

function makeUser(): SignInDto {
  return {
    email: 'any@mail.com',
    password: 'any password',
  };
}

describe('UserController', () => {
  let app: any;
  let nestApp: INestApplication;
  const path = '/auth';

  beforeAll(async () => {
    nestApp = await BuildAppModule(AuthController, [
      { provide: UserRepositoryKey, useClass: UserRepositoryMock },
      { provide: EncrypterKey, useClass: EncrypterMock },
      {
        provide: RedisService,
        useValue: { set: vi.fn(), del: vi.fn(), get: vi.fn() },
      },
      {
        provide: AuthService.name,
        useFactory: (userRepository, encrypter, jwt, redis) =>
          new AuthService(userRepository, encrypter, jwt, redis),
        inject: [UserRepositoryKey, EncrypterKey, JwtService, RedisService],
      },
    ]);
    app = nestApp.getHttpServer();
  });

  beforeEach(() => {
    UserRepositoryMock.users = [];
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('POST auth - SignIn', () => {
    it('should return 200 with token', async () => {
      const user = makeUser();
      UserRepositoryMock.users.push(
        User.createNew({
          email: user.email,
          password: user.password,
          name: 'any name',
        }),
      );
      const response = await request(app)
        .post(`${path}/signin`)
        .send({ email: user.email, password: user.password });

      expect(response.status).toBe(200);
      expect(response.body.data.token).toBeTruthy();
    });

    it('should return 400 if email is not provided', async () => {
      const response = await request(app).post(`${path}/signin`).send({
        password: 'any password',
      });

      expectValidation(response, 'Falha na validação dos campos');
      expect(response.body.invalidFields).toEqual([
        { field: 'email', message: 'Email é obrigatório, Email inválido' },
      ]);
    });

    it('should return 400 if email is invalid', async () => {
      const response = await request(app).post(`${path}/signin`).send({
        password: 'any password',
        email: 'invalid-email',
      });

      expectValidation(response, 'Falha na validação dos campos');
      expect(response.body.invalidFields).toEqual([
        { field: 'email', message: 'Email inválido' },
      ]);
    });

    it('should return 401 if email not found', async () => {
      const response = await request(app).post(`${path}/signin`).send({
        email: 'not_found@mail.com',
        password: 'any password',
      });

      expectValidation(response, 'Email ou senha inválido', 401);
    });

    it('should return 400 if password is not provided', async () => {
      const response = await request(app).post(`${path}/signin`).send({
        email: 'any@mail.com',
      });

      expectValidation(response, 'Falha na validação dos campos');
      expect(response.body.invalidFields).toEqual([
        { field: 'password', message: 'Senha é obrigatória' },
      ]);
    });

    it('should return 401 if password is invalid', async () => {
      const user = makeUser();
      UserRepositoryMock.users.push(
        User.createNew({
          email: user.email,
          password: user.password,
          name: 'any name',
        }),
      );

      const response = await request(app)
        .post(`${path}/signin`)
        .send({ email: user.email, password: 'invalid password' });

      expectValidation(response, 'Email ou senha inválido', 401);
    });
  });
});
