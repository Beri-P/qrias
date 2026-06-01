import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Qrias API')
    .setDescription('Media platform API — auth, content, analytics')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const doc = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, doc)

  await app.listen(process.env.PORT ?? 3000)
  console.log(`API running on http://localhost:3000`)
  console.log(`Swagger docs at http://localhost:3000/api/docs`)
}
bootstrap()