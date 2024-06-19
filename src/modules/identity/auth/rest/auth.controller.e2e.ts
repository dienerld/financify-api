import request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { BuildAppModule } from '@/__tests__/builders/app.builder';

import { User } from '../../user/core/entities';
import { SignInDto } from '../dto/input.dto';

import { AuthModule } from '../auth.module';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Encrypter, EncrypterKey } from '../../user/core/interfaces';

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
  let prismaService: PrismaService;
  let encrypter: Encrypter;

  const path = '/auth';

  beforeAll(async () => {
    nestApp = await BuildAppModule(AuthModule);
    prismaService = nestApp.get(PrismaService);
    encrypter = nestApp.get(EncrypterKey);
    app = nestApp.getHttpServer();
  });

  beforeEach(async () => {
    await prismaService.user.deleteMany();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('POST auth - SignIn', () => {
    it('should return 200 with token', async () => {
      const userDto = makeUser();
      const user = User.createNew({
        email: userDto.email,
        password: userDto.password,
        name: 'any name',
      });
      await prismaService.user.create({
        data: {
          ...user.toJSON(),
          password: await encrypter.hash(user.getPassword()),
        },
      });
      const response = await request(app)
        .post(`${path}/signin`)
        .send({ email: userDto.email, password: userDto.password });

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
      const userDto = makeUser();
      const user = User.createNew({
        email: userDto.email,
        password: userDto.password,
        name: 'any name',
      });

      await prismaService.user.create({
        data: {
          ...user.toJSON(),
          password: user.getPassword(),
        },
      });

      const response = await request(app)
        .post(`${path}/signin`)
        .send({ email: userDto.email, password: 'invalid password' });

      expectValidation(response, 'Email ou senha inválido', 401);
    });
  });
});
