import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export const setupSwagger = (app: INestApplication): void => {
  if (process.env.ENABLE_SWAGGER_API_DOCUMENT === '1') {
    const config = app.get(ConfigService)

    const title = config.get<string>('provider')
    const options = new DocumentBuilder()
      .setTitle(title)
      .addBearerAuth()
      .addServer('')
      .addServer('/api')
      .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  }
}
