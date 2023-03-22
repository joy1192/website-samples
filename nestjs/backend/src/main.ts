import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  // OpenAPI用の設定を追加
  const options = new DocumentBuilder().
    setTitle('NestJS Sample API').
    setDescription('NestJS Sample API Description').
    setVersion('1.0').
    addTag('NestJS Sample API').
    build();

  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(80);
}
bootstrap();
