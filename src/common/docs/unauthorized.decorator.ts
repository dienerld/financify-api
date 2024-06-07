import { ApiProperty, ApiUnauthorizedResponse } from '@nestjs/swagger';

class InvalidField {
  @ApiProperty({
    name: 'field',
    type: String,
    description: 'Field an invalid',
  })
  field: string;

  @ApiProperty({
    name: 'message',
    type: String,
    description: 'message explain error',
  })
  message: string;
}

class UnauthorizedResponse {
  @ApiProperty({
    name: 'statusCode',
    type: Number,
    example: 401,
    description: 'Returns a request status code',
  })
  statusCode: number = 401;

  @ApiProperty({
    name: 'timestamp',
    type: String,
    description: 'Returns a timestamp of request',
  })
  timestamp: string;

  @ApiProperty({
    name: 'path',
    type: String,
    description: 'Returns a path requested',
  })
  path: string;

  @ApiProperty({
    name: 'message',
    type: String,
    description: 'Returns a summary error',
  })
  message: string;
}

export function ApiResponseUnauthorized() {
  return ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: 'Returns an error when not authenticated',
  });
}
