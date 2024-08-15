import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserService } from '../user/user.service'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from '../infrastructure/guards/local.strategy'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService, LocalStrategy],
})
export class AuthModule {}
