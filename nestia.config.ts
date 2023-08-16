import { INestiaConfig } from '@nestia/sdk';

const config: INestiaConfig = {
  input: ['src/app-nestia.controller.ts'],
  swagger: {
    decompose: true,
    output: 'swagger.json',
    security: {
      apiKey: {
        type: 'apiKey',
        name: 'authorization',
        in: 'header',
      },
    },
    info: {
      version: '1.0.0',
      title: 'nestia swagger example',
      description: 'nestia swagger example',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server',
      },
    ],
  },
};

export default config;
