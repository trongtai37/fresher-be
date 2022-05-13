import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { TransformInterceptor } from './share/interceptors/transform.interceptor';
import { ValidationPipe } from '@share/pipe/validation.pipe';
import { HttpExceptionFilter } from './share/filter/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

config();

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('S-Wallet Backend API SWagger')
    .setDescription('This is a detail specification of API Swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('/api/v1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-swagger', app, document);

  app.setGlobalPrefix('api/v1');

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(configService.get<number>('PORT') || 3000);
}

bootstrap();
