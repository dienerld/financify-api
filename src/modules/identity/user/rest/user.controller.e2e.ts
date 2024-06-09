import request from 'supertest';
import { BuildAppModule } from '@/__tests__/builders/app.builder';
import { INestApplication } from '@nestjs/common';
import { EncrypterKey, UserRepositoryKey } from '../core/interfaces';
import { UserRepositoryMock } from '../__tests__/user-repository-mock';
import { UserController } from './user.controller';
import { EncrypterMock } from '../__tests__/encrypter-mock';
import { UserService } from '../core/services';
import { CreateUserDto } from './dto/input.dto';
import { User } from '../core/entities';

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
  const path = '/user';

  beforeAll(async () => {
    nestApp = await BuildAppModule(UserController, [
      {
        provide: UserRepositoryKey,
        useClass: UserRepositoryMock,
      },
      {
        provide: EncrypterKey,
        useClass: EncrypterMock,
      },
      {
        provide: UserService.name,
        useFactory: (userRepository, encrypter) =>
          new UserService(userRepository, encrypter),
        inject: [UserRepositoryKey, EncrypterKey],
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

      expect(UserRepositoryMock.users.length).toBe(1);
      expect(UserRepositoryMock.users[0].getId()).toBe(response.body.data.id);
    });

    it('should return 400 when user already exists', async () => {
      const user = makeUser();
      UserRepositoryMock.users.push(User.createNew(user));

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
