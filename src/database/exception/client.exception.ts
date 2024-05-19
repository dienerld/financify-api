export abstract class PersistenceException extends Error {
  protected statusCode: number;
  getStatus() {
    return this.statusCode;
  }
}

export class PersistenceInternalException extends PersistenceException {
  constructor(message: string) {
    super(message);
    this.statusCode = 500;
  }
}

export class PersistenceClientException extends PersistenceException {
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export class PersistenceNotFoundException extends PersistenceException {
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export class PersistenceBadRequestException extends PersistenceException {
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}
