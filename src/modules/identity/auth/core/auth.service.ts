import { UnauthorizedException } from '@nestjs/common';
import {
  Encrypter,
  UserRepository,
} from '@modules/identity/user/core/interfaces';
import { User } from '@modules/identity/user/core/entities';
import { JwtService } from '@nestjs/jwt';

export class AuthService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{
    token: string;
    id: string;
    name: string;
  }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválido');
    }
    const isPasswordMatch = await this.encrypter.compare(
      password,
      user.getPassword(),
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Email ou senha inválido');
    }

    const token = await this.jwtService.signAsync({
      sub: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
    });

    return {
      token,
      name: user.getName(),
      id: user.getId(),
    };
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválido');
    }
    const isPasswordMatch = await this.encrypter.compare(
      password,
      user.getPassword(),
    );

    if (!isPasswordMatch) {
      return null;
    }

    return user;
  }
}
