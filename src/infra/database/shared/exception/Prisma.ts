import { DomainException } from '@/core/common/exceptions/domain.exception';
import {
  PersistenceClientException,
  PersistenceInternalException,
} from '../../in-memory/exception/client.exception';

export abstract class DefaultPrismaRepository {
  protected handleAndThrowError(error: unknown): never {
    const errorMessage = this.extractErrorMessage(error);
    if (error instanceof DomainException) {
      throw new PersistenceClientException(error.message);
    }

    throw new PersistenceInternalException(errorMessage);
  }

  private extractErrorMessage(error: unknown): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return 'An unexpected error occurred.';
  }
}
