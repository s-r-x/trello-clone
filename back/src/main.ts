import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';
import { ValidationPipe } from './common/pipes/validation.pipe';
//import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .useGlobalPipes(new ValidationPipe())
    //.use(helmet())
    .enableCors();

  await app.listen(PORT);
}
bootstrap();
