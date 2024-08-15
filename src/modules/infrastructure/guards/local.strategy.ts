import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from 'src/modules/auth/auth.service'
import { UserEntity } from 'src/modules/user/entities/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    const user = await this.authService.login(username, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
