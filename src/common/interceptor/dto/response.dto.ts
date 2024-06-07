import { ApiResponseProperty } from '@nestjs/swagger';

export abstract class CustomResponseDto<T = unknown> {
  @ApiResponseProperty({
    type: Boolean,
    example: true,
  })
  success: boolean;

  @ApiResponseProperty({
    type: Number,
    example: 200,
  })
  code: number;

  abstract data: T;
}
