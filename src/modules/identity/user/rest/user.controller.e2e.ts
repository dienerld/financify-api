import request from 'supertest';
import { BuildAppModule } from '@/__tests__/builders/app.builder';
import { PrismaService } from '@/common/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';

import { UserModule } from '../user.module';
import { CreateUserDto } from './dto/input.dto';

import { UserBuilder } from '../__tests__/builder/user.builder';
import { SessionBuilder } from '@/__tests__/builders/auth-token.builder';
import { RedisService } from '@/database/redis/redis.service';
import { redisConst } from '@/database/redis/constants';
import { ulid } from 'ulid';

const expectValidation = (response: any, message: string) => {
  expect(response.status).toBe(400);
  expect(response.body.success).toBeFalsy();
  expect(response.body.message).toBe(message);
};

function makeUser(): CreateUserDto {
  return {
    name: 'any name',
    email: 'any@mail.com',
    password: 'any password',
  };
}

describe('UserController', () => {
  let app: any;
  let nestApp: INestApplication;
  let prismaService: PrismaService;
  let redisService: RedisService;

  const path = '/user';

  beforeAll(async () => {
    nestApp = await BuildAppModule(UserModule);
    app = nestApp.getHttpServer();
    prismaService = nestApp.get(PrismaService);
    redisService = nestApp.get(RedisService);
  });

  afterAll(async () => {
    await redisService.delByPattern(`${redisConst.userSession}-*`);
    await nestApp.close();
  });

  beforeEach(async () => {
    await prismaService.user.deleteMany();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('POST - Create', () => {
    it('should return 201 with user created', async () => {
      const user = makeUser();
      const response = await request(app).post(path).send(user);

      expect(response.status).toBe(201);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          email: user.email,
          name: user.name,
        }),
      );

      expect(await prismaService.user.count()).toBe(1);
      expect((await prismaService.user.findMany())[0].id).toBe(
        response.body.data.id,
      );
    });

    it('should return 400 when user already exists', async () => {
      const user = makeUser();
      await UserBuilder.init()
        .withName(user.name)
        .withEmail(user.email)
        .withPassword(user.password)
        .buildAndSave(prismaService);

      const response = await request(app).post(path).send(user);

      expectValidation(response, 'Email em uso');
    });

    it('should return 400 when send invalid email', async () => {
      const user = makeUser();
      user.email = 'invalid-email';

      const response = await request(app).post(path).send(user);

      expectValidation(response, 'Falha na validação dos campos');
      expect(response.body.invalidFields).toEqual([
        { field: 'email', message: 'Email inválido' },
      ]);
    });

    it('should return 400 when send invalid name', async () => {
      const user = makeUser();
      user.name = '';

      const response = await request(app).post(path).send(user);

      expectValidation(response, 'Falha na validação dos campos');
      expect(response.body.invalidFields).toEqual([
        { field: 'name', message: 'Nome é obrigatório' },
      ]);
    });

    it('should return 400 when send invalid password', async () => {
      const user = makeUser();
      user.password = '';

      const response = await request(app).post(path).send(user);

      expectValidation(response, 'Falha na validação dos campos');
      expect(response.body.invalidFields).toEqual([
        { field: 'password', message: 'Senha é obrigatória' },
      ]);
    });
  });

  describe('GET - List', () => {
    it('should return 200 with empty list', async () => {
      const { bearer } = await SessionBuilder.init(redisService).build();
      const response = await request(app)
        .get(path)
        .set('Authorization', bearer);

      expect(response.status).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data).toEqual([]);
    });

    it('should return 200 with list of users', async () => {
      await UserBuilder.init().buildAndSave(prismaService);
      const { bearer } = await SessionBuilder.init(redisService).build();

      const response = await request(app)
        .get(path)
        .set('Authorization', bearer);

      expect(response.status).toBe(200);
      expect(response.body.success).toBeTruthy();
    });
  });

  describe('GET - Find', () => {
    it('should return 200 with user found', async () => {
      const user = await UserBuilder.init().buildAndSave(prismaService);
      const { bearer } = await SessionBuilder.init(redisService).build();

      const response = await request(app)
        .get(`${path}/${user.getId()}`)
        .set('Authorization', bearer);

      expect(response.status).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data).toEqual(
        expect.objectContaining({
          id: user.getId(),
          email: user.getEmail(),
          name: user.getName(),
        }),
      );
    });

    it('should return 404 when user not found', async () => {
      const { bearer } = await SessionBuilder.init(redisService).build();

      const response = await request(app)
        .get(`${path}/${ulid()}`)
        .set('Authorization', bearer);

      expect(response.status).toBe(404);
      expect(response.body.success).toBeFalsy();
      expect(response.body.message).toBe('Usuário não encontrado');
    });
  });
});
