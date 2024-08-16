import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { RegisterDto } from './dto/resgister.dto'
import { UserEntity } from './entities/user.entity'
import ReqUser from '../infrastructure/decorators/user.decorator'
import { JwtAuthGuard } from '../infrastructure/guards/jwt.guards'

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() body: RegisterDto): Promise<{ message: string }> {
    const { username, password } = body
    const user = await this.userService.findOneUser(username)
    if (user) {
      throw new BadRequestException('This username already exists.')
    }

    await this.userService.create({
      username,
      password: await this.userService.hashPassword(password),
      roles: ['user'],
      accessToken: null,
    })

    return { message: 'success' }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@ReqUser() user: UserEntity): Promise<UserEntity> {
    return user
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async users(): Promise<UserEntity[]> {
    return this.userService.find()
  }
}
