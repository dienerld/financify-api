import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { BaseOpenApiResponse } from './base';

class ServerErrorResponse extends BaseOpenApiResponse {
  constructor() {
    super(500);
  }
}
export function ApiResponseServerError() {
  return ApiInternalServerErrorResponse({
    type: ServerErrorResponse,
    description: 'Returns an internal server error',
  });
}
