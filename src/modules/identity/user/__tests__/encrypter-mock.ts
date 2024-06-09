import { Encrypter } from '@modules/identity/user/core/interfaces';
export class EncrypterMock implements Encrypter {
  async hash(value: string): Promise<string> {
    return value;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return value === hash;
  }
}
