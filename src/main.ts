import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { setupSwagger } from './modules/infrastructure/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger()
  const configService = app.get(ConfigService)
  const port = configService.get<number>('port')

  app.useLogger(logger)

  setupSwagger(app)

  await app.listen(port, () => {
    logger.log(`Application:started listen on port ${port}`)
  })
}
bootstrap()
