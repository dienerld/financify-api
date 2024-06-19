import { ApiBadRequestResponse, ApiProperty } from '@nestjs/swagger';
import { BaseOpenApiResponse } from './base';

class InvalidField {
  @ApiProperty({
    name: 'field',
    type: String,
    description: 'Campo inválido',
  })
  field: string;

  @ApiProperty({
    name: 'message',
    type: String,
    description: 'Mensagem de erro',
  })
  message: string;
}

class BadRequestResponse extends BaseOpenApiResponse {
  constructor() {
    super(400);
  }

  @ApiProperty({
    name: 'invalidFields',
    type: InvalidField,
    isArray: true,
    nullable: true,
    description: 'Returna um array com os campos inválidos',
  })
  invalidFields: InvalidField[];
}

export function ApiResponseBadRequest() {
  return ApiBadRequestResponse({
    type: BadRequestResponse,
    description: 'Returna um erro de validação dos campos',
  });
}
