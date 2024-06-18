import { CustomResponseDto } from '@/common/interceptor/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class SchemaSignInResponse extends CustomResponseDto<SignInResponseDto> {
  @ApiProperty({
    name: 'data',
    type: SignInResponseDto,
  })
  data: SignInResponseDto;
}
