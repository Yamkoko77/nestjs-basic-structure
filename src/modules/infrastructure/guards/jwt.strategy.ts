import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserService } from 'src/modules/user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('authentication.secret'),
    })
  }

  async validate(payload: any) {
    if (!payload?.username) {
      throw new UnauthorizedException()
    }

    const user = await this.userService.findOneUser(payload.username)
    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return user
  }
}
