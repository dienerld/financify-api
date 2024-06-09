import { Provider } from '@nestjs/common';

import { EncrypterKey } from '../../core/interfaces';
import { BcryptEncrypter } from '../encrypter';

export const encrypterProvider: Provider = {
  provide: EncrypterKey,
  useClass: BcryptEncrypter,
};
