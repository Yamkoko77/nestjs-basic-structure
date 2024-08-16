import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from '../infrastructure/guards/jwt.strategy'

@Module({
  imports: [PassportModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
