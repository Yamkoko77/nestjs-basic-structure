import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'

import jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'
import { UserEntity } from '../user/entities/user.entity'

@Injectable()
export class AuthService {
  private readonly secret: string
  private readonly signOptions: jwt.SignOptions

  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.secret = configService.get('authentication.secret')
    this.signOptions = configService.get<jwt.SignOptions>(
      'authentication.jwtOptions',
    )
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUser(username)
    if (user && user.password === pass) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(username: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findOneUser(username)
    if (!user) {
      throw new UnauthorizedException()
    }

    const isMatchPassword = await this.usersService.comparePassword(
      user.password,
      password,
    )
    if (!isMatchPassword) {
      throw new UnauthorizedException()
    }

    const tokenPayload = {
      username,
    }

    user.accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.secret,
      expiresIn: '1d',
    })

    return user
  }
}
