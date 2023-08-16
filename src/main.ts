import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import helmet from 'helmet';
import { useSwegger } from './lib/nest-use-swagger';
import { useSweggerNestia } from './lib/nestia-use-swagger';
import { TypiaExceptionFilter } from './lib/nestia-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * config - middle ware
   */
  app.use(helmet());
  app.enableCors({
    credentials: true,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
  });

  const useNestia: boolean = true;

  if (useNestia) {
    /**
     * use nestia swagger
     */
    app.useGlobalFilters(new TypiaExceptionFilter());
    useSweggerNestia(app);
  } else {
    /**
     * use nest swagger
     */
    app.useGlobalPipes(new ValidationPipe());
    useSwegger(app);
  }

  /**
   * config - server host
   */
  await app.listen(3000, '0.0.0.0');
}
bootstrap()
  .then(() => {
    //
  })
  .catch((err) => {
    console.error(err);
  });
