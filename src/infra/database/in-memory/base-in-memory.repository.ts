import { BaseRepository } from '@/core/modules/transaction/persistence/repository/base.interface';
import {
  PersistenceClientException,
  PersistenceException,
} from './exception/client.exception';

export abstract class BaseInMemoryRepository implements BaseRepository {
  handleAndThrowError(error: unknown): never {
    const errorMessage = this.extractErrorMessage(error);
    if (error instanceof PersistenceException) {
      throw error;
    }

    throw new PersistenceClientException(errorMessage);
  }

  private extractErrorMessage(error: unknown): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return 'An unexpected error occurred.';
  }
}
