export interface Encrypter {
  hash(value: string): Promise<string>;
  compare(value: string, hash: string): Promise<boolean>;
}

export const EncrypterKey = Symbol('ENCRYPTER');
