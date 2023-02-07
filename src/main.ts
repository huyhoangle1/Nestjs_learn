import { ExceptionLoggerFilter } from './utils/exceptionLogger.filter';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Validate } from 'class-validator';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new ExceptionLoggerFilter(httpAdapter))
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log('localhost:3000');
  
}
bootstrap();
