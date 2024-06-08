import { CreateUserProps, User } from '../entities';
import { UserRepository } from '../persistence';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async save(userDto: CreateUserProps): Promise<User> {
    const user = User.createNew(userDto);
    await this.userRepository.save(user);
    return user;
  }

  async list(): Promise<User[]> {
    return this.userRepository.list();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }
}
