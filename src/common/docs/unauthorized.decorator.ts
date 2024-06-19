import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BaseOpenApiResponse } from './base';

class UnauthorizedResponse extends BaseOpenApiResponse {
  constructor() {
    super(401);
  }
}

export function ApiResponseUnauthorized() {
  return ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: 'Returna um erro de autenticação',
  });
}
