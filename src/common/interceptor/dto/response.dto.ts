import { ApiProperty } from '@nestjs/swagger';

export class CustomResponseDto {
  @ApiProperty({
    name: 'status',
    type: Boolean,
    example: true,
  })
  success: boolean;

  @ApiProperty({
    name: 'code',
    type: Number,
    example: 200,
  })
  code: number;

  @ApiProperty({
    name: 'data',
    type: Object,
    example: {},
  })
  data: any;
}
