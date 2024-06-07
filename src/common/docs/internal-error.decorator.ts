import { ApiInternalServerErrorResponse, ApiProperty } from '@nestjs/swagger';

class ServerErrorResponse {
  @ApiProperty({
    name: 'statusCode',
    type: Number,
    example: 500,
    description: 'Returns a request status code',
  })
  statusCode: number = 500;

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

export function ApiResponseServerError() {
  return ApiInternalServerErrorResponse({
    type: ServerErrorResponse,
    description: 'Returns an internal server error',
  });
}
