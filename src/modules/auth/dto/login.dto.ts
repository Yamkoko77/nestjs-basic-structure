import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'ykk777',
  })
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty({
    type: String,
    required: true,
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  password: string
}
