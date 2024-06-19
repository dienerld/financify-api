import request from 'supertest';
import { BuildAppModule } from '@/__tests__/builders/app.builder';
import { INestApplication } from '@nestjs/common';
import { CreateUserDto } from './dto/input.dto';
import { User } from '../core/entities';
import { UserModule } from '../user.module';
import { PrismaService } from '@/common/prisma/prisma.service';

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

  const path = '/user';

  beforeAll(async () => {
    nestApp = await BuildAppModule(UserModule);
    app = nestApp.getHttpServer();
    prismaService = nestApp.get(PrismaService);
  });

  beforeEach(async () => {
    await prismaService.user.deleteMany();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('POST user - Create', () => {
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
      await prismaService.user.create({
        data: { ...User.createNew(user).toJSON(), password: user.password },
      });

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
});
