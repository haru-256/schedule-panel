import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add ValidationPipe to validate request parameters
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // Add ExceptionFilter to handle PrismaClientException
  // https://docs.nestjs.com/exception-filters#inheritance
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // Set Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('Batch Repository')
    .setDescription('The Batch Repository API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
