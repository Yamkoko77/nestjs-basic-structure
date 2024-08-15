import { ApiProperty } from '@nestjs/swagger'

export class LoginEntity {
  @ApiProperty({
    type: String,
    example: 'accessTokenString',
  })
  accessToken: string
}
