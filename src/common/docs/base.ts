import { ApiProperty } from '@nestjs/swagger';

export class BaseOpenApiResponse {
  constructor(statusCode: number) {
    this.statusCode = statusCode;
  }

  @ApiProperty({
    name: 'statusCode',
    type: Number,
    example: 401,
    description: 'Returna o código de status da requisição',
  })
  statusCode: number;

  @ApiProperty({
    name: 'timestamp',
    type: String,
    description: 'Retorna a data e hora da requisição',
  })
  timestamp: string;

  @ApiProperty({
    name: 'path',
    type: String,
    description: 'Returna o caminho da requisição',
  })
  path: string;

  @ApiProperty({
    name: 'message',
    type: String,
    description: 'Returna a mensagem de erro',
  })
  message: string;
}
