import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const useSwegger = (app: INestApplication) => {
  const builderConfig = new DocumentBuilder()
    .setExternalDoc('Export open-api json', 'http://localhost:3000/api-json')
    .setTitle('nestia - example')
    .setDescription('nestia - example')
    .setVersion('1.0.0')
    .addSecurity('authorization', {
      type: 'apiKey',
      scheme: 'bearer',
      name: 'authorization',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, { ...builderConfig });

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      showRequestDuration: true,
      filter: true,
    },
  });
};
