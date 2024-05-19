import { PersistenceException } from '@/infra/database/exception/client.exception';
import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export class CatchAllException implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    function isInstanceOf(classType: Function) {
      return exception instanceof classType;
    }

    if (isInstanceOf(PersistenceException) || isInstanceOf(HttpException)) {
      statusCode = exception.getStatus();
    }

    let message =
      exception.message || 'Erro interno. Tente novamente mais tarde.';

    if (statusCode === 401 || statusCode === 403) {
      message = 'Não Autorizado';
    }

    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      invalidFields: exception.response?.invalidFields,
    });
  }
}
