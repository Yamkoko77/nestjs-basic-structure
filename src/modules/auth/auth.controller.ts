import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { UserEntity } from '../user/entities/user.entity'
import { LocalAuthGuard } from '../infrastructure/guards/local-auth.guard'
import ReqUser from '../infrastructure/decorators/user.decorator'
import { LoginEntity } from './entities/login.entity'
import { ApiBody, ApiTags } from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(
    @ReqUser() user: UserEntity,
    @Body() _: LoginDto,
  ): Promise<LoginEntity> {
    return { accessToken: user.accessToken }
  }
}
