import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class RegisterDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'ykk001',
  })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({
    type: String,
    required: true,
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
