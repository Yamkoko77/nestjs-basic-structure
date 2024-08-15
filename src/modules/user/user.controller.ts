import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { RegisterDto } from './dto/resgister.dto'

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
}
