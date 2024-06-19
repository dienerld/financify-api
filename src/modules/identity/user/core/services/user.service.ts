import {
  PersistenceBadRequestException,
  PersistenceNotFoundException,
} from '@/database/exception/client.exception';
import { CreateUserProps, User } from '../entities';
import { Encrypter, UserRepository } from '../interfaces';

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter,
  ) {}

  async save(userDto: CreateUserProps): Promise<User> {
    const userExists = await this.userRepository.findByEmail(userDto.email);
    if (userExists) {
      throw new PersistenceBadRequestException('Email em uso');
    }

    const CipherPass = await this.encrypter.hash(userDto.password);
    const user = User.createNew({
      ...userDto,
      password: CipherPass,
    });
    await this.userRepository.save(user);

    return user;
  }

  async list(): Promise<User[]> {
    return this.userRepository.list();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new PersistenceNotFoundException('Usuário não encontrado');
    }

    return user;
  }
}
